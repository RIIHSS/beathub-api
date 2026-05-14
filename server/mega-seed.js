// 1. Correctly load .env from the parent folder
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const NUM_DOCS = 50;

async function seedDatabase() {
    try {
        // Use 127.0.0.1 for Windows stability
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/beathub';

        console.log("⏳ Connecting to MongoDB...");
        await mongoose.connect(uri);
        console.log("🚀 Connection successful!");

        // 2. IMPORT MODELS
        // Since this script is in /server and models are in /server/models, 
        // the correct relative path is just './models/'
        const User = require('./models/User'); 
        const Artist = require('./models/Artist');
        const Song = require('./models/Song');
        const Album = require('./models/Album');
        const Playlist = require('./models/Playlist');

        console.log("🧹 Cleaning old data...");
        await User.deleteMany({});
        await Artist.deleteMany({});
        await Song.deleteMany({});
        await Album.deleteMany({});
        await Playlist.deleteMany({});

        console.log("✨ Database cleaned. Generating fresh data...");

        // 3. SEED USERS
        const users = Array.from({ length: NUM_DOCS }, () => ({
            username: faker.internet.username(),
            email: faker.internet.email().toLowerCase(),
            password: 'password123'
        }));
        const createdUsers = await User.insertMany(users);
        console.log(`👤 Created ${createdUsers.length} Users`);

        // 4. SEED ARTISTS
        const genres = ['Pop', 'Rock', 'Hip-Hop', 'Jazz'];
        const artists = Array.from({ length: NUM_DOCS }, () => ({
            name: faker.person.fullName(),
            genre: faker.helpers.arrayElement(genres),
            debutYear: faker.number.int({ min: 1950, max: 2024 }),
            bio: faker.lorem.sentence(12)
        }));
        const createdArtists = await Artist.insertMany(artists);
        console.log(`🎸 Created ${createdArtists.length} Artists`);

        // 5. SEED SONGS
        const songs = Array.from({ length: NUM_DOCS }, () => ({
            title: faker.music.songName(),
            artist: faker.helpers.arrayElement(createdArtists).name, 
            genre: faker.helpers.arrayElement(genres),
            duration: faker.number.int({ min: 120, max: 300 })
        }));
        const createdSongs = await Song.insertMany(songs);
        console.log(`🎵 Created ${createdSongs.length} Songs`);

        // 6. SEED ALBUMS
        const albums = Array.from({ length: NUM_DOCS }, () => {
            const randomArtist = faker.helpers.arrayElement(createdArtists);
            const randomSongs = faker.helpers.arrayElements(createdSongs, 5);
            return {
                title: faker.music.album(),
                artist: randomArtist._id,
                songs: randomSongs.map(s => s._id),
                releaseDate: faker.date.past()
            };
        });
        await Album.insertMany(albums);
        console.log(`💿 Created ${NUM_DOCS} Albums`);

        // 7. SEED PLAYLISTS
        const playlists = Array.from({ length: NUM_DOCS }, () => {
            const randomOwner = faker.helpers.arrayElement(createdUsers);
            const randomSongs = faker.helpers.arrayElements(createdSongs, 10);
            return {
                name: `${faker.word.adjective()} ${faker.music.genre()} Mix`,
                description: faker.lorem.sentence(),
                owner: randomOwner._id,
                songs: randomSongs.map(s => s._id)
            };
        });
        await Playlist.insertMany(playlists);
        console.log(`📝 Created ${NUM_DOCS} Playlists`);

        console.log("\n✅ MEGA SEED COMPLETE! 250 documents added.");

    } catch (error) {
        console.error("❌ Seeding Error:");
        console.error(error);
    } finally {
        await mongoose.connection.close();
        console.log("🔌 Connection closed.");
        process.exit();
    }
}

seedDatabase();