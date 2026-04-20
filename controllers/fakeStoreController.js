const apiAdapter = require('../adapters/apiAdapter');

// Get all products
exports.getProducts = async (req, res) => {
    await apiAdapter.getProducts(req, res);
};

// Get single product

exports.getProduct = async (req, res) => {
    await apiAdapter.getProduct(req, res);
};

// Create a new product
exports.createProduct = async (req, res) => {
    await apiAdapter.createProduct(req, res);
}