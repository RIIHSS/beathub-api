// 1. Declare the service ONLY ONCE at the top
const productService = require('../services/product.service');

// 2. GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.findAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

// 3. GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
    try {
        const product = await productService.findProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid Product ID format" });
        }
        res.status(500).json({ error: "Server Error" });
    }
};

// 4. PATCH (Update) PRODUCT
exports.patchProduct = async (req, res) => {
    try {
        const updated = await productService.updateProduct(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updated);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(400).json({ error: error.message });
    }
};

// 5. DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await productService.deleteProduct(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(204).send(); // 204 No Content for successful delete
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};w