const API_BASE_URL = 'https://fakestoreapi.com/products';

// Función para obtener todos los productos
export const getProducts = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error('Error al obtener productos');
        }
        const data = await response.json();
        // Mapear los campos de la API al formato esperado por la app
        // API: {id, title, price, description, category, image}
        // App espera: {id, name, description, price}
        return data.map(product => ({
            id: product.id,
            name: product.title, // Mapear title a name
            description: product.description,
            price: product.price,
            image: product.image // Incluir la imagen del producto
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        return []; // Retornar array vacío en caso de error
    }
};

// Función para obtener un producto por ID
export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el producto');
        }
        const product = await response.json();
        // Mapear campos
        return {
            id: product.id,
            name: product.title,
            description: product.description,
            price: product.price,
            image: product.image
        };
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return null;
    }
};

// Función para crear un nuevo producto
export const createProduct = async (productData) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: productData.name, // Mapear name a title para la API
                price: productData.price,
                description: productData.description,
                category: productData.category || 'general', // Valor por defecto si no se proporciona
                image: productData.image || 'https://via.placeholder.com/150' // Valor por defecto
            })
        });
        if (!response.ok) {
            throw new Error('Error al crear el producto');
        }
        const newProduct = await response.json();
        // Retornar en formato de la app
        return {
            id: newProduct.id,
            name: newProduct.title,
            description: newProduct.description,
            price: newProduct.price,
            image: newProduct.image
        };
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// Función para actualizar un producto
export const updateProduct = async (id, productData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: productData.name, // Mapear name a title
                price: productData.price,
                description: productData.description,
                category: productData.category || 'general',
                image: productData.image || 'https://via.placeholder.com/150'
            })
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }
        const updatedProduct = await response.json();
        // Retornar en formato de la app
        return {
            id: updatedProduct.id,
            name: updatedProduct.title,
            description: updatedProduct.description,
            price: updatedProduct.price,
            image: updatedProduct.image
        };
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Función para eliminar un producto
export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
        return true; // Éxito
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// Mantener la función calculateTotal sin cambios, ya que no depende de la fuente de datos
export const calculateTotal = (items) => {
    return items.reduce(
        (accumulator, item) => accumulator + item.product.price * item.quantity
        , 0);
};