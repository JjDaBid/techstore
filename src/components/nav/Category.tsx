/* eslint-disable @typescript-eslint/no-explicit-any */
import queryString from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

interface CategoryProps {
    label: string;
    icon: IconType;
    selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({
    label,
    icon: Icon,
    selected
}) => {

    const navigate = useNavigate();
    const [params] = useSearchParams(); 

    const handleClick = useCallback(() => {
        if(label === 'All'){
            navigate('/')
        } else {
            let currentQuery = {};

            if(params){
                currentQuery = queryString.parse(params.toString())
            }

            const updatedQuery: any = {
                ...currentQuery,
                category: label
            }

            const url = queryString.stringifyUrl(
                {
                    url: '/',
                    query: updatedQuery
                },
                {
                    skipNull: true
                }
            )

            navigate(url)
            console.log(url)
        }
    }, [label, params, navigate])

    return (
        <div 
            onClick={handleClick}
        
            className={`
                flex 
                items-center
                justify-center
                text-center 
                gap-1 
                p-2 
                border-b-2 
                hover:text-slate-800 
                transition 
                cursor-pointer 
                ${selected ? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500'}        
                `} >
                <Icon size={20}/>
            <div className="font-medium text-sm"></div>
        </div>
    )
}
export default Category;
