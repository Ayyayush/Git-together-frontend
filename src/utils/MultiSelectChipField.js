import { Controller } from "react-hook-form"

const MultiSelectChipField = ({
    label,
    name,
    control,
    options = [],
    error
}) => {
    return (
        <div className="form-control w-full">
            {label && (
                <label className="label">
                    <span className="label-text font-medium">{label}</span>
                </label>
            )}

            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    const selected = field.value || []

                    const toggleSkill = (id) => {
                        if (selected.includes(id)) {
                            field.onChange(selected.filter(s => s !== id))
                        } else {
                            field.onChange([...selected, id])
                        }
                    }

                    return (
                        <div className="flex flex-wrap gap-2">
                            {options.map(skill => (
                                <button
                                    key={skill.id}
                                    type="button"
                                    onClick={() => toggleSkill(skill.id)}
                                    className={`badge cursor-pointer px-3 py-3 transition
                                        ${selected.includes(skill.id)
                                            ? "badge-primary text-white"
                                            : "badge-outline"
                                        }`}
                                >
                                    {skill.name}
                                </button>
                            ))}
                        </div>
                    )
                }}
            />

            {error && (
                <p className="text-error text-xs mt-1">
                    {error.message}
                </p>
            )}
        </div>
    )
}

export default MultiSelectChipField
