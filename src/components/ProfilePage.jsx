import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { CgSpinner } from "react-icons/cg"
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaCamera, FaCloudUploadAlt } from 'react-icons/fa'

import UserCard from './UserCard'
import { Base_URL, skillList, genderList, stateList } from '../utils/helper/constant'
import { addUser } from '../utils/redux/slices/userSlice'
import InputField from '../utils/form/InputField'
import SelectField from '../utils/form/SelectField'
import MultiSelectChipField from '../utils/form/MultiSelectChipField'

const profileSchema = yup.object({
    firstName: yup.string()
        .required('First name is required')
        .min(2, 'Min 2 characters')
        .max(50, 'Max 50 characters')
        .matches(/^[A-Za-z]+$/, 'Letters only'),
    lastName: yup.string().nullable().matches(/^[A-Za-z]*$/, 'Letters only'),
    photo: yup.mixed().nullable(),
    // 1. Fixed: optional() suppresses min/max on null
    age: yup.number().nullable().optional().min(18, 'Must be 18+').max(100).transform((v, o) => (o === '' ? null : v)),
    gender: yup.string().nullable(),
    experienceLevel: yup.string().nullable(),
    bio: yup.string().required('Bio is required').max(500, 'Max 500 chars'),
    skills: yup.array().of(yup.string()).nullable(),
    state: yup.string().required("State is required"),
    country: yup.string().nullable(),
    githubUrl: yup.string().nullable().url('Invalid URL'),
    linkedinUrl: yup.string().nullable().url('Invalid URL'),
    twitterUrl: yup.string().nullable().url('Invalid URL'),
    portfolioUrl: yup.string().nullable().url('Invalid URL'),
})

const EXPERIENCE_OPTIONS = [
    { id: 'fresher', name: 'Fresher' },
    { id: 'junior',  name: 'Junior' },
    { id: 'mid',     name: 'Mid-Level' },
    { id: 'senior',  name: 'Senior' },
]

const ProfilePage = () => {
    const dispatch      = useDispatch()
    const userFromStore = useSelector(state => state.user.user)
    const [isLoading, setIsLoading] = useState(false)
    const [photoPreview, setPhotoPreview] = useState(null)

    const {
        register, handleSubmit, watch, control, reset, setValue,
        formState: { errors, isDirty }
    } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            firstName: '', lastName: '', age: null, country: 'India',
            gender: '', photo: null, bio: '', experienceLevel: 'fresher',
            skills: [], state: '', githubUrl: '', linkedinUrl: '',
            twitterUrl: '', portfolioUrl: ''
            // 2. Removed emailId and uniqueId — display-only, shouldn't be in the form
        },
        mode: "onChange"
    })

    // 3. Subscribe only to fields used in the preview, not the entire form
    const [firstName, lastName, bio, skills, experienceLevel, gender, age] =
        watch(['firstName', 'lastName', 'bio', 'skills', 'experienceLevel', 'gender', 'age'])

    const previewUser = {
        ...userFromStore,
        firstName, lastName, bio, skills, experienceLevel, gender, age,
        photo: photoPreview || userFromStore?.photo
    }

    useEffect(() => {
        if (userFromStore) {
            reset({
                firstName:       userFromStore.firstName || '',
                lastName:        userFromStore.lastName || '',
                age:             userFromStore.age || null,
                gender:          userFromStore.gender || '',
                photo:           null,
                bio:             userFromStore.bio || '',
                experienceLevel: userFromStore.experienceLevel || 'fresher',
                skills:          userFromStore.skills || [],
                state:           userFromStore.location?.state || '',
                country:         'India',
                githubUrl:       userFromStore.githubUrl || '',
                linkedinUrl:     userFromStore.linkedinUrl || '',
                twitterUrl:      userFromStore.twitterUrl || '',
                portfolioUrl:    userFromStore.portfolioUrl || '',
            })
            setPhotoPreview(userFromStore.photo || null)
        }
    }, [userFromStore, reset])

    // 4. Revoke blob URLs to avoid memory leaks
    useEffect(() => {
        return () => {
            if (photoPreview?.startsWith("blob:")) {
                URL.revokeObjectURL(photoPreview)
            }
        }
    }, [photoPreview])

    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0]
        if (!file) return
        if (file.size > 5 * 1024 * 1024) return toast.error("Max 5MB allowed")
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
            return toast.error("JPG, PNG or WebP only")

        // Revoke previous blob before creating a new one
        if (photoPreview?.startsWith("blob:")) {
            URL.revokeObjectURL(photoPreview)
        }

        setPhotoPreview(URL.createObjectURL(file))
        setValue('photo', file, { shouldDirty: true, shouldValidate: true })
    }, [photoPreview, setValue])

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            const formData = new FormData()

            formData.append('firstName', data.firstName)
            if (data.lastName)        formData.append('lastName', data.lastName)
            if (data.age)             formData.append('age', data.age)
            if (data.gender)          formData.append('gender', data.gender)
            formData.append('bio', data.bio)
            if (data.experienceLevel) formData.append('experienceLevel', data.experienceLevel)
            formData.append('skills', JSON.stringify(data.skills || []))
            formData.append('location', JSON.stringify({ state: data.state, country: data.country }))
            if (data.githubUrl)    formData.append('githubUrl', data.githubUrl)
            if (data.linkedinUrl)  formData.append('linkedinUrl', data.linkedinUrl)
            if (data.twitterUrl)   formData.append('twitterUrl', data.twitterUrl)
            if (data.portfolioUrl) formData.append('portfolioUrl', data.portfolioUrl)
            if (data.photo instanceof File) formData.append('photo', data.photo)

            // 5. PATCH, not POST — this is an update
            const res = await axios.patch(`${Base_URL}/profile/edit`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            })

            dispatch(addUser(res.data.data))
            // 6. Clear the file field so re-saving doesn't re-upload the same file
            setValue("photo", null)
            toast.success('Profile updated successfully')

        } catch (err) {
            toast.error(err?.response?.data?.message || 'Update failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 pb-10 bg-[#0B0E14] min-h-screen">
            <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">

                <div className="w-full lg:flex-1 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/40">
                    <div className="p-6 md:p-8">
                        <div className='border-b border-white/10 pb-4 mb-6'>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Edit Profile</h2>
                            <p className="text-sm text-gray-500 mt-0.5">Update your details below.</p>
                        </div>

                        {/* 7. Display-only fields — not part of the form */}
                        {userFromStore && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">DevTinder ID</p>
                                    <p className="text-sm text-gray-400 font-mono">{userFromStore.uniqueId || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Email</p>
                                    <p className="text-sm text-gray-400">{userFromStore.emailId || '—'}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">

                            {/* Image Upload */}
                            <div className="flex flex-col items-center justify-center p-6 bg-white/[0.02] rounded-2xl border border-dashed border-white/15">
                                <div className="relative mb-4 group">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/40 to-cyan-400/30 blur-md" />
                                    <div className="relative w-24 h-24 rounded-full ring-2 ring-indigo-400/40 ring-offset-2 ring-offset-[#0B0E14] overflow-hidden bg-[#11151d]">
                                        {photoPreview ? (
                                            <img src={photoPreview} alt="Profile preview" className="object-cover w-full h-full" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                <FaCamera size={30} />
                                            </div>
                                        )}
                                    </div>
                                    <label htmlFor="photo-upload" className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                                        <FaCamera className="text-white" />
                                    </label>
                                </div>
                                <div className="text-center">
                                    <input
                                        type="file"
                                        id="photo-upload"
                                        accept="image/png, image/jpeg, image/webp"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    <label htmlFor="photo-upload" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/15 text-gray-300 hover:border-indigo-400/40 hover:bg-white/5 transition-all cursor-pointer">
                                        <FaCloudUploadAlt /> Upload New Photo
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">Max 5MB (JPG, PNG, WebP)</p>
                                </div>
                            </div>

                            {/* Personal Details */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-100 mb-3">Personal Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="First Name" name="firstName" register={register} required error={errors.firstName} />
                                    <InputField label="Last Name"  name="lastName"  register={register} error={errors.lastName} />
                                    <InputField label="Age" name="age" type="number" register={register} error={errors.age} />
                                    <SelectField label="Gender" name="gender" register={register} options={genderList} error={errors.gender} />
                                    <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                                        <SelectField label="State" name="state" register={register} required options={stateList} error={errors.state} />
                                        <InputField label="Country" name="country" required register={register} disabled className="bg-white/[0.03] cursor-not-allowed text-gray-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-white/10" />

                            {/* Professional Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-100 mb-3">Professional Info</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SelectField label="Experience Level" name="experienceLevel" register={register} options={EXPERIENCE_OPTIONS} error={errors.experienceLevel} />
                                    <MultiSelectChipField label="Skills" name="skills" control={control} options={skillList} error={errors.skills} />
                                    <div className="md:col-span-2">
                                        <InputField label="Bio" name="bio" required register={register} textarea error={errors.bio} placeholder="Tell us about yourself..." />
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-white/10" />

                            {/* Social Links */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-100 mb-3">Social Presence</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="GitHub URL"    name="githubUrl"    icon={<FaGithub />}                          register={register} placeholder="https://github.com/..."    error={errors.githubUrl} />
                                    <InputField label="LinkedIn URL"  name="linkedinUrl"  icon={<FaLinkedin className="text-indigo-400" />} register={register} placeholder="https://linkedin.com/..."  error={errors.linkedinUrl} />
                                    <InputField label="Twitter URL"   name="twitterUrl"   icon={<FaTwitter className="text-cyan-400" />}   register={register} placeholder="https://twitter.com/..."   error={errors.twitterUrl} />
                                    <InputField label="Portfolio URL" name="portfolioUrl" icon={<FaGlobe className="text-emerald-400" />}   register={register} placeholder="https://myportfolio.com"  error={errors.portfolioUrl} />
                                </div>
                            </div>

                            <div className="mt-2">
                                <button
                                    type="submit"
                                    // 8. Disabled when nothing changed
                                    disabled={isLoading || !isDirty}
                                    className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isLoading
                                        ? <span className="flex items-center justify-center gap-2"><CgSpinner className="animate-spin text-xl" /> Saving...</span>
                                        : "Save Changes"
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Preview */}
                <div className="w-full lg:w-96 sticky top-28 h-fit">
                    <div className="flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2.5 mb-4 text-sm text-indigo-300">
                        <span className="loading loading-dots loading-xs" />
                        <span className="font-semibold">Live Preview</span>
                    </div>
                    <UserCard user={previewUser} />
                </div>

            </div>
        </div>
    )
}

export default ProfilePage