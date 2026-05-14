const Album = require('../models/Album');

exports.findAllAlbums = async () => await Album.find().populate('artist').populate('songs');

exports.createNewAlbum = async (data) => await Album.create(data);

exports.findAlbumById = async (id) => await Album.findById(id).populate('artist').populate('songs');

exports.updateAlbum = (id, data) => Album.findByIdAndUpdate(id, data, { new: true, runValidators: true });

exports.deleteAlbum = (id) => Album.findByIdAndDelete(id);