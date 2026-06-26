const SelectField = ({
    label,
    name,
    register,
    options = [],
    error,
    required = false,
    disabled = false
}) => {
    return (
        <div className="form-control w-full">
            {label && (
                <label className="label">
                    <span className="label-text font-medium">
                        {label} {required && <span className="text-error">*</span>}
                    </span>
                </label>
            )}

            <select
                {...register(name)}
                disabled={disabled}
                className={`select select-bordered w-full ${error ? "select-error" : ""}`}
            >
                <option value="">Select</option>
                {options.map(opt => (
                    <option key={opt.id} value={opt.id}>
                        {opt.name}
                    </option>
                ))}
            </select>

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

export default SelectField
