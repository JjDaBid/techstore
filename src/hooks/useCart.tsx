/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "../pages/product/[productId]/ProductDetails";
import { toast} from 'react-hot-toast';

type CartContextType = {
    cartTotalQuantity: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQuantityIncrease: (product: CartProductType) => void;
    handleCartQuantityDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
}

export const CartContext = createContext<CartContextType | null> (null);

interface Props {
    [propName: string] : any;
}

export const CartContextProvider = (props: Props) => {

    const [cartTotalQuantity, setCartTotalQuantity]= useState(0);

    const [cartTotalAmount, setCartTotalAmount] = useState(0);

    const [cartProducts, setCartProducts] = useState<CartProductType[] | null> (null)

    console.log('Quantity', cartTotalQuantity);
    console.log('Amount', cartTotalAmount);

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)

        setCartProducts(cProducts)
    },[])

    useEffect(() => {
        const getTotals = () => {

            if(cartProducts){
                // eslint-disable-next-line no-unsafe-optional-chaining
                const {total, quantity} = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity;
    
                    acc.total += itemTotal;
                    acc.quantity += item.quantity;
    
                    return acc;
                }, {
                    total: 0,
                    quantity: 0
                });
                setCartTotalQuantity(quantity);
                setCartTotalAmount(total);      
            }        
        }; 
        getTotals();
    }, [cartProducts])

    const handleAddProductCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if(prev){
                updatedCart = [...prev, product];
            } else {
                updatedCart = [product];
            }

            toast.success("Producto Agregado al carro")
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));

            return updatedCart;
        })

    }, []);

    const handleRemoveProductFromCart = useCallback((
        product: CartProductType
    ) => {
        if(cartProducts){
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            setCartProducts(filteredProducts);
            toast.success("Producto Eliminado");
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts));
        }
    }, [cartProducts]);

    const handleCartQuantityIncrease = useCallback((
        product: CartProductType
    ) => {
        let updatedCart;

        if(product.quantity === 99){
            return toast.error("Número máximo de unidades alcanzado")
        }

        if(cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

            if(existingIndex > -1) {
                updatedCart[existingIndex].quantity = ++ updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
        }
    }, [cartProducts])

    const handleCartQuantityDecrease = useCallback((
        product: CartProductType
    ) => {
        if(product.quantity === 1){
            return toast.error("Número mínimo de unidades alcanzado")
        }

        if(cartProducts) {
            const updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

            if(existingIndex > -1) {
                updatedCart[existingIndex].quantity = -- updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
        }
    }, [cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQuantity(0)
        localStorage.setItem('eShopCartItems', JSON.stringify(null))
    },[cartProducts])

    const value = {
        cartTotalQuantity,
        cartTotalAmount,
        cartProducts,
        handleAddProductCart,
        handleRemoveProductFromCart,
        handleCartQuantityIncrease,
        handleCartQuantityDecrease,
        handleClearCart
    }

    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext);

    if(context === null) {
        throw new Error("useCart must be used within a CartContextprovider")
    }

    return context;
}


