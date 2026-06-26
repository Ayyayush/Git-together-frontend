const InputField = ({
    label,
    name,
    register,
    error,
    type = "text",
    textarea = false,
    disabled = false,
    className = "",
    placeholder = ""
}) => {
    return (
        <div className="form-control w-full">
            {label && (
                <label className="label">
                    <span className="label-text font-medium">{label}</span>
                </label>
            )}

            {textarea ? (
                <textarea
                    {...register(name)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`textarea textarea-bordered w-full ${className} ${error ? "textarea-error" : ""}`}
                />
            ) : (
                <input
                    {...register(name)}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`input input-bordered w-full ${className} ${error ? "input-error" : ""}`}
                />
            )}

            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">
                        {error.message}
                    </span>
                </label>
            )}
        </div>
    )
}

export default InputField
