const Product = require('../model/productModel');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json({ product });
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json({ products });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get product by ID
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json({ product });
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json({ product });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
