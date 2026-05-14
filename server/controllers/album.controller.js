const albumService = require('../services/album.service');

exports.getAllAlbums = async (req, res) => {
    try {
        const albums = await albumService.findAllAlbums();
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAlbumById = async (req, res) => {
    try {
        const album = await albumService.findAlbumById(req.params.id);
        if (!album) return res.status(404).json({ message: "Album not found" });
        res.status(200).json(album);
    } catch (error) {
        if (error.name === 'CastError') return res.status(400).json({ message: "Invalid ID" });
        res.status(500).json({ error: error.message });
    }
};

exports.createAlbum = async (req, res) => {
    try {
        const { title, artist } = req.body;
        if (!title || !artist) return res.status(400).json({ error: "Title and Artist required" });
        const album = await albumService.createNewAlbum(req.body);
        res.status(201).json({ message: "Album created!", album });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateAlbum = async (req, res) => {
    try {
        const updated = await albumService.updateAlbum(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Album not found" });
        res.status(200).json({ success: true, album: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteAlbum = async (req, res) => {
    try {
        const deleted = await albumService.deleteAlbum(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Album not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};