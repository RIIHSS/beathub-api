const songService = require('../services/song.service');

exports.getAllSongs = async (req, res) => {
    try {
        const songs = await songService.findAllSongs();
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSongById = async (req, res) => {
    try {
        const song = await songService.findSongById(req.params.id);
        if (!song) return res.status(404).json({ message: "Song not found" });
        res.status(200).json(song);
    } catch (error) {
        if (error.name === 'CastError') return res.status(400).json({ message: "Invalid ID" });
        res.status(500).json({ error: error.message });
    }
};

exports.createSong = async (req, res) => {
    try {
        const { title, artist, duration } = req.body;
        if (!title || !artist || !duration) return res.status(400).json({ error: "Missing fields" });
        const song = await songService.createNewSong(req.body);
        res.status(201).json({ message: "Song added!", song });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateSong = async (req, res) => {
    try {
        const updated = await songService.updateSong(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Song not found" });
        res.status(200).json({ success: true, song: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteSong = async (req, res) => {
    try {
        const deleted = await songService.deleteSong(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Song not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};