import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ProductCardView = ({ handler, id, name, description, price, image }) => {
    const navigate = useNavigate();
    const [showDescription, setShowDescription] = useState(false);

    const onAddProduct = (product) => {
        handler(product);
        navigate("/cart");
    };

    return (
        <div
            className="card shadow-sm border-0 h-100"
            style={{
                borderRadius: "15px",
                overflow: "hidden",
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                transition: "transform 0.2s ease-in-out",
            }}
        >
            {/* Product Image */}
            {image && (
                <img
                    src={image}
                    alt={name}
                    className="card-img-top img-fluid"
                    style={{ height: "220px", objectFit: "contain", background: "#fdfdfdff" }}
                />
            )}

            <div className="card-body d-flex flex-column">
                {/* Product Title */}
                <h5 className="card-title text-primary fw-bold">{name}</h5>

                {/* Price */}
                <p className="card-text text-success fs-5 fw-semibold">$ {price}</p>

                {/* Expandable Description */}
                {showDescription && (
                    <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                        {description}
                    </p>
                )}
                <button
                    className="btn btn-link p-0 mb-2"
                    style={{ fontSize: "0.85rem", color: "#0a96a8ff" }}
                    onClick={() => setShowDescription(!showDescription)}
                >
                    {showDescription ? "Mostrar menos ▲" : "Mostrar mas▼"}
                </button>

                {/* Add to Cart Button */}
                <button
                    className="btn btn-warning mt-auto fw-bold"
                    onClick={() => onAddProduct({ id, name, description, price, image })}
                >
                    🛒 Add to Cart
                </button>
            </div>
        </div>
    );
};
