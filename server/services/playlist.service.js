const Playlist = require('../models/Playlist');

exports.findAllPlaylists = async () => await Playlist.find().populate('owner', 'username').populate('songs');

exports.createNewPlaylist = async (data) => await Playlist.create(data);

exports.findPlaylistById = async (id) => await Playlist.findById(id).populate('owner', 'username').populate('songs');

exports.updatePlaylist = (id, data) => Playlist.findByIdAndUpdate(id, data, { new: true, runValidators: true });

exports.deletePlaylist = (id) => Playlist.findByIdAndDelete(id);