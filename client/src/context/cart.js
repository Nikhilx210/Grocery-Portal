import { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [Cart, setCart] = useState([])
    useEffect(() => {
        const data = localStorage.getItem("cart");
        if (data) {
            setCart(JSON.parse(data));
        }
        //eslint-disable-next-line
    }, [])
    return (
        <CartContext.Provider value={[Cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

//custom hook

const useCart = () => useContext(CartContext)

export { useCart, CartProvider }