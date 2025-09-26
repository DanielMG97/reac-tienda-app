import { useEffect, useState } from "react";
import { getProducts, deleteProduct, createProduct, updateProduct } from "../services/productService";

export const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para el formulario
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Estado para controlar descripciones expandidas
    // Usamos un objeto donde la clave es el ID del producto y el valor es true/false
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    // Función para cargar productos
    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null); // Limpiar errores previos
            const prods = await getProducts();
            setProducts(prods);
        } catch (err) {
            setError('Error al cargar productos. Verifica tu conexión a internet.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Cargar productos al montar el componente
    useEffect(() => {
        loadProducts();
    }, []);

    // Función para manejar la eliminación de un producto
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await deleteProduct(id);
                // Recargar la lista después de eliminar para reflejar cambios
                loadProducts();
            } catch (err) {
                setError('Error al eliminar el producto.');
                console.error(err);
            }
        }
    };

    // Función para manejar el envío del formulario (crear o actualizar)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Actualizar producto
                await updateProduct(editingId, formData);
            } else {
                // Crear nuevo producto
                await createProduct(formData);
            }
            // Limpiar formulario y recargar lista
            resetForm();
            loadProducts();
        } catch (err) {
            setError(isEditing ? 'Error al actualizar el producto.' : 'Error al crear el producto.');
            console.error(err);
        }
    };

    // Función para iniciar edición de un producto
    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString() // Convertir a string para el input
        });
        setIsEditing(true);
        setEditingId(product.id);
    };

    // Función para cancelar edición
    const handleCancel = () => {
        resetForm();
    };

    // Función para resetear el formulario
    const resetForm = () => {
        setFormData({ name: '', description: '', price: '' });
        setIsEditing(false);
        setEditingId(null);
    };

    // Función para alternar la visibilidad de la descripción
    const toggleDescription = (productId) => {
        setExpandedDescriptions(prev => ({
            ...prev,
            [productId]: !prev[productId] // Invierte el estado actual
        }));
    };

    // Función para manejar cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Mostrar loading mientras se cargan los productos
    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-2">Cargando productos...</p>
                </div>
            </div>
        );
    }

    // Mostrar error si ocurre
    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Lista de Productos</h2>
            <p className="text-muted">Ejemplo de integración de las funciones CRUD con la API REST.</p>

            {/* Formulario para crear/actualizar productos */}
            <div className="card mb-4">
                <div className="card-header">
                    <h5>{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripción</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                rows="3"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Precio</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary me-2">
                            {isEditing ? 'Actualizar' : 'Crear'}
                        </button>
                        {isEditing && (
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                Cancelar
                            </button>
                        )}
                    </form>
                </div>
            </div>

            {/* Lista de productos */}
            <div className="row">
                {products.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info">No hay productos disponibles.</div>
                    </div>
                ) : (
                    products.map(prod => {
                        const isExpanded = expandedDescriptions[prod.id]; // Verifica si la descripción está expandida
                        const shortDescription = prod.description.length > 100
                            ? prod.description.substring(0, 100) + '...'
                            : prod.description; // Trunca la descripción si es muy larga

                        return (
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={prod.id}>
                                <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                                    {/* Imagen del producto con estilos modernos */}
                                    {prod.image && (
                                        <img
                                            src={prod.image}
                                            alt={prod.name}
                                            className="card-img-top"
                                            style={{
                                                height: '220px',
                                                objectFit: 'cover',
                                                borderTopLeftRadius: '15px',
                                                borderTopRightRadius: '15px'
                                            }}
                                        />
                                    )}
                                    <div className="card-body d-flex flex-column" style={{ padding: '1.5rem' }}>
                                        {/* Título del producto */}
                                        <h5 className="card-title text-primary mb-2" style={{ fontWeight: '600' }}>
                                            {prod.name}
                                        </h5>

                                        {/* Precio con estilo destacado */}
                                        <p className="card-text mb-3" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#28a745' }}>
                                            $ {prod.price}
                                        </p>

                                        {/* Descripción expandible/colapsable */}
                                        <div className="mb-3">
                                            <p className="card-text" style={{ lineHeight: '1.6' }}>
                                                {isExpanded ? prod.description : shortDescription}
                                            </p>
                                            {prod.description.length > 100 && (
                                                <button
                                                    className="btn btn-link p-0 text-decoration-none"
                                                    onClick={() => toggleDescription(prod.id)}
                                                    style={{ fontSize: '0.9rem', color: '#007bff' }}
                                                >
                                                    {isExpanded ? 'Mostrar menos' : 'Mostrar más'}
                                                </button>
                                            )}
                                        </div>

                                        {/* Botones de acción */}
                                        <div className="mt-auto d-flex gap-2">
                                            <button
                                                className="btn btn-outline-warning flex-fill"
                                                onClick={() => handleEdit(prod)}
                                                style={{ borderRadius: '25px' }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-outline-danger flex-fill"
                                                onClick={() => handleDelete(prod.id)}
                                                style={{ borderRadius: '25px' }}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};