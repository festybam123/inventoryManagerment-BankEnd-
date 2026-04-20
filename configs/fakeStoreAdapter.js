const axios = require('axios');

const baseURL = 'https://fakestoreapi.com';

const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const response = await apiClient.get('/products');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single product
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await apiClient.get(`/products/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const response = await apiClient.post('/products', req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};