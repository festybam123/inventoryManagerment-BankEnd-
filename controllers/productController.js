const Product = require('../model/productModel');
const cloudinary = require('../model/midleware/cloudinary');

const user = require('../model/userModel');
const { sendEmail } = require('../model/midleware/emailSender');

// Create a new product
exports.createProductwithmail = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;

        const product = await Product({ name, price, quantity });
        await product.save();

        //get all admins
        const admins = await user.find({ role: 'admin' });
        const adminEmails = admins.map(a => a.email);

        //send email 
        const subject1 = 'New Product Created';
        const messaage1 = 
        `<h1>Inventory Management System</h1>
        <p>A new product has been created:</p>
        <ul>
            <li>Name: ${product.name}</li>
            <li>Price: ${product.price}</li>
            <li>Quantity: ${product.quantity}</li>
        </ul>`;

        if(adminEmails.length > 0) {
            await sendEmail(adminEmails.join(','), subject1, messaage1);
        }

        res.status(201).json({ product });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateImage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if(!product.image) {
            const publicId = product.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy('products/' + publicId);
        }

        //save new image 
        product.image = req.file.path;
        await product.save();

        res.json({ message: 'Image updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Create a new product
exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
};

// Get all products
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json({ products });
};

// Get product by ID
exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ product });
};

// Update product by ID
exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ product });
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
};

