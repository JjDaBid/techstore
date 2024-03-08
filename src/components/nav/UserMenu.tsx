import { useCallback, useState } from "react"
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

const UserMenu = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);        
    }, [])


    return (
        <div className="relative z-30">
            <div 
                onClick={toggleOpen}
                className="
                    p-2 
                    border-slate-400 
                    flex 
                    flex-row 
                    items-center 
                    gap-1 
                    rounded-full 
                    cursor-pointer 
                    hover:shadow-md 
                    transition-text
                    text-slate-700">
                <Avatar/>
                <AiFillCaretDown/>
            </div>
            {isOpen && (
                <div 
                    className="
                        absolute 
                        rounded-md 
                        shadow-md 
                        w-[170px] 
                        bg-white 
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                        flex
                        flex-col
                        cursor-pointer
                        ">
                            <div>
                                <Link to={"/orders"}>
                                    <MenuItem onClick={toggleOpen}>Ordenes</MenuItem>
                                </Link>   
                                <Link to={"/admin"}>
                                    <MenuItem onClick={toggleOpen}>Admin</MenuItem>
                                </Link>     
                                {/* <Link to={"/orders"}>
                                    <MenuItem onClick={() => {
                                        toggleOpen();
                                        //signOut();
                                    }}>Cerrar Sesión</MenuItem>
                                </Link>                                 */}
                            </div>

                            <div>
                                <Link to={"/login"}>
                                    <MenuItem onClick={toggleOpen}>Login</MenuItem>
                                </Link>   
                                <Link to={"/register"}>
                                    <MenuItem onClick={toggleOpen}>Registro</MenuItem>
                                </Link>     
                                <Link to={"/orders"}>
                                    <MenuItem onClick={() => {
                                        toggleOpen();
                                        // signOut();
                                    }}>Cerrar Sesión</MenuItem>
                                </Link>                                
                            </div>
                        </div>                        
            )}
        </div>
    )
}
export default UserMenu
