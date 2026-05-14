const express = require('express');
const router = express.Router();

// --- 1. IMPORT ALL CONTROLLERS (Only once each) ---
const userCtrl = require('../controllers/user.controller');
const artistCtrl = require('../controllers/artist.controller');
const songCtrl = require('../controllers/song.controller');
const albumCtrl = require('../controllers/album.controller');
const playlistCtrl = require('../controllers/playlist.controller');
const productCtrl = require('../controllers/product.controller');

// --- 2. DEFINE ROUTES ---

// USER ROUTES
router.route('/users')
    .get(userCtrl.getAllUsers)
    .post(userCtrl.createUser);

router.route('/users/:id')
    .get(userCtrl.getUserById)
    .patch(userCtrl.updateUser)
    .delete(userCtrl.deleteUser);

// ARTIST ROUTES
router.route('/artists')
    .get(artistCtrl.getAllArtists)
    .post(artistCtrl.createArtist);

router.route('/artists/:id')
    .get(artistCtrl.getArtistById)
    .patch(artistCtrl.updateArtist)
    .delete(artistCtrl.deleteArtist);

// SONG ROUTES
router.route('/songs')
    .get(songCtrl.getAllSongs)
    .post(songCtrl.createSong);

router.route('/songs/:id')
    .get(songCtrl.getSongById)
    .patch(songCtrl.updateSong)
    .delete(songCtrl.deleteSong);

// ALBUM ROUTES
router.route('/albums')
    .get(albumCtrl.getAllAlbums)
    .post(albumCtrl.createAlbum);

router.route('/albums/:id')
    .get(albumCtrl.getAlbumById)
    .patch(albumCtrl.updateAlbum)
    .delete(albumCtrl.deleteAlbum);

// PLAYLIST ROUTES
router.route('/playlists')
    .get(playlistCtrl.getAllPlaylists)
    .post(playlistCtrl.createPlaylist);

router.route('/playlists/:id')
    .get(playlistCtrl.getPlaylistById)
    .patch(playlistCtrl.updatePlaylist)
    .delete(playlistCtrl.deletePlaylist);

// PRODUCT ROUTES (The new ones from your lab)
router.route('/products')
    .get(productCtrl.getAllProducts);

router.route('/products/:id')
    .get(productCtrl.getProductById)
    .patch(productCtrl.patchProduct)
    .delete(productCtrl.deleteProduct);

module.exports = router;