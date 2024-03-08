/* eslint-disable @typescript-eslint/no-unused-vars */
import queryString from 'query-string';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface FormData {
    searchTerm: string;
}

const SearchBar = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>({
        defaultValues: {
            searchTerm: ''
        }
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!data.searchTerm) {
            navigate('/');
            return;
        }

        const url = queryString.stringifyUrl({
            url: '/',
            query: {
                searchTerm: data.searchTerm
            }
        }, { skipNull: true });

        navigate(url);
        reset();
    };

    return (
        <div className="flex items-center mb-2">
            <input
                {...register('searchTerm')}
                autoComplete="off"
                type="text"
                placeholder="Realiza tu búsqueda"
                className="p-2 border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80"
            />
            <button
                onClick={handleSubmit(onSubmit)}
                className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md"
            >
                Buscar
            </button>
        </div>
    );
};

export default SearchBar;
