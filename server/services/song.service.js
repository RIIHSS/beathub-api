const Song = require('../models/Song');

exports.findAllSongs = async () => await Song.find();

exports.findSongById = async (id) => await Song.findSongById(id);

exports.createNewSong = async (data) => await Song.create(data);

exports.updateSong = (id, data) => Song.findByIdAndUpdate(id, data, { new: true, runValidators: true });

exports.deleteSong = (id) => Song.findByIdAndDelete(id);