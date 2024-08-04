const InputLabelForm = (
    {
        propidname,
        proplabelplaceholder,
        type = 'text',
        value,
        e,
        required = false,
    }
) => {
    return (
        <div>
            <label htmlFor={propidname} className="block text-sm font-medium text-gray-700">
                {proplabelplaceholder}
            </label>
            <input
                id={propidname}
                name={propidname}
                type={type}
                placeholder={proplabelplaceholder}
                className="input input-bordered w-full"
                value={value}
                onChange={e}
                required={required}
            />
        </div>
    )
}

export default InputLabelForm