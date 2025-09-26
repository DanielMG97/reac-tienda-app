import { Navbar } from "./Navbar";
import { useItemsCart } from "../hooks/useItemsCart";
import { CartRoutes } from "../routes/CartRoutes";
import "../styles/CartApp.css"; 


export const CartApp = () => {
    const { cartItems, handlerAddProductCart, handlerDeleteProductCart } = useItemsCart();

    return (
        <>
            <Navbar />

            <div className="text-center mb-5">
                <h1 className="fw-bold cartapp-title">🛒 Nuestros Productos</h1>
                <hr className="w-50 mx-auto text-primary" />
            </div>

            <div className="cartapp-container shadow-lg">
                <CartRoutes
                    cartItems={cartItems}
                    handlerAddProductCart={handlerAddProductCart}
                    handlerDeleteProductCart={handlerDeleteProductCart}
                />
            </div>

            <footer className="text-center mt-5 mb-3 cartapp-footer">
                <small>© 2025 - Tu Tienda Online</small>
            </footer>
        </>
    );
};
