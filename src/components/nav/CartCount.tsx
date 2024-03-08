'use-client'

import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom"
import { useCart } from "../../hooks/useCart";

const CartCount = () => {

    const { cartTotalQuantity } = useCart();

    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate('/cart')} 
            className="relative cursor-pointer">
                <div className="text-3xl">
                    <CiShoppingCart/>
                </div>
                <span 
                    className="
                        absolute 
                        top-[-10px]
                        right-[-10px]
                        bg-slate-700
                        text-white
                        h-6
                        w-6
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-sm">
                    {cartTotalQuantity}
                </span>

        </div>
    )
}
export default CartCount
