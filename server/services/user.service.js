const User = require('../models/User');

exports.findAllUsers = async () => await User.find();

exports.createNewUser = async (data) => await User.create(data);

exports.findUserById = async (id) => await User.findById(id);

exports.updateUser = (id, data) => User.findByIdAndUpdate(id, data, { new: true, runValidators: true });

exports.deleteUser = (id) => User.findByIdAndDelete(id);
