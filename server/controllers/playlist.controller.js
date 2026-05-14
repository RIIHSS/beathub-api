const playlistService = require('../services/playlist.service');

exports.getAllPlaylists = async (req, res) => {
    try {
        const playlists = await playlistService.findAllPlaylists();
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPlaylistById = async (req, res) => {
    try {
        const playlist = await playlistService.findPlaylistById(req.params.id);
        if (!playlist) return res.status(404).json({ message: "Playlist not found" });
        res.status(200).json(playlist);
    } catch (error) {
        if (error.name === 'CastError') return res.status(400).json({ message: "Invalid ID" });
        res.status(500).json({ error: error.message });
    }
};

exports.createPlaylist = async (req, res) => {
    try {
        const { name, owner } = req.body;
        if (!name || !owner) return res.status(400).json({ error: "Name and Owner required" });
        const playlist = await playlistService.createNewPlaylist(req.body);
        res.status(201).json({ message: "Playlist created!", playlist });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePlaylist = async (req, res) => {
    try {
        const updated = await playlistService.updatePlaylist(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Playlist not found" });
        res.status(200).json({ success: true, playlist: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePlaylist = async (req, res) => {
    try {
        const deleted = await playlistService.deletePlaylist(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Playlist not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};