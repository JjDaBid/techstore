import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectProps {
    id: string;
    label: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    options: { label: string; value: string }[];
}

const Select: React.FC<SelectProps> = ({
    id,
    label,
    disabled = false,
    required = false,
    register,
    errors,
    options,
}) => {
    return (
        <div className="w-full relative">
            <select
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                className={`
                    peer
                    w-full
                    p-4
                    pt-6
                    outline-none
                    by-white
                    font-light
                    border-2 
                    rounded-md
                    transition
                    disabled: opacity-70
                    disabled: cursor-not-allowed
                    ${errors[id] ? "border-rose-400" : "border-slate-300"}
                    ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"}
                `}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <label
                htmlFor={id}
                className="
                    absolute
                    cursor-text
                    text-md
                    duration-150
                    transform
                    -translate-y-3
                    top-5
                    z-10
                    origin-[0]
                    left-4
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:translate-y-full
                "
            >
                {label}
            </label>
        </div>
    );
};

export default Select;
