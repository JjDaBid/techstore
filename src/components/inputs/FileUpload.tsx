import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useState } from "react";

interface FileUploadProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
}

const FileUpload: React.FC<FileUploadProps> = ({
    id,
    label,
    type = "file",
    disabled = false,
    required = false,
    register,
    errors
}) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log("1. file: ", file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                register(id, { required }).onChange({ target: { value: base64String, type: 'file' } });
                console.log("2. base64String: ", file)
            };
            reader.readAsDataURL(file);
        }

        console.log("3. file: ", file)
        
    };

    return (
        <div className="relative">
            <input
                autoComplete="off"
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=""
                type={type}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
            />
            <div className={`flex items-center justify-center w-full h-full border-2 border-gray-300 rounded-lg
                ${errors[id] ? "border-rose-400" : "border-slate-300"}
                ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"}
            `}>
                {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                    <div className="flex flex-col items-center space-y-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 6a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm2-2a1 1 0 00-1 1v2a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1H6zM5 12a1 1 0 00-1 1v2a1 1 0 001 1h10a1 1 0 001-1v-2a1 1 0 00-1-1H5z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p className="text-sm text-gray-500">{label}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
