const Artist = require('../models/Artist');

exports.findAllArtists = async () => await Artist.find();

exports.createNewArtist = async (data) => await Artist.create(data);

exports.findArtistById = async (id) => await Artist.findById(id);

exports.updateArtist = (id, data) => Artist.findByIdAndUpdate(id, data, { new: true, runValidators: true });

exports.deleteArtist = (id) => Artist.findByIdAndDelete(id);
