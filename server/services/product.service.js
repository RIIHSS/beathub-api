const Product = require('../models/Product');

exports.findAllProducts = async () => {
    return await Product.find();
};

exports.findProductById = async (id) => {
    return await Product.findById(id);
};

exports.updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

exports.deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};