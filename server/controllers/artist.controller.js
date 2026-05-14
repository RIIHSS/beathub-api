const artistService = require('../services/artist.service');

exports.getAllArtists = async (req, res) => {
    try {
        const artists = await artistService.findAllArtists();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getArtistById = async (req, res) => {
    try {
        const artist = await artistService.findArtistById(req.params.id);
        if (!artist) return res.status(404).json({ message: "Artist not found" });
        res.status(200).json(artist);
    } catch (error) {
        if (error.name === 'CastError') return res.status(400).json({ message: "Invalid ID" });
        res.status(500).json({ error: error.message });
    }
};

exports.createArtist = async (req, res) => {
    try {
        const { name, genre } = req.body;
        if (!name || !genre) return res.status(400).json({ error: "Name and Genre required" });
        const artist = await artistService.createNewArtist(req.body);
        res.status(201).json({ message: "Artist created!", artist });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateArtist = async (req, res) => {
    try {
        const updated = await artistService.updateArtist(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Artist not found" });
        res.status(200).json({ success: true, artist: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteArtist = async (req, res) => {
    try {
        const deleted = await artistService.deleteArtist(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Artist not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};