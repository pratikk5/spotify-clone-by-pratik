import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// First, create all songs
		const createdSongs = await Song.insertMany([
			{
				title: "Hey Minnale",
				artist: "G.V. Prakash Kumar",
				imageUrl: "/cover-images/7.jpg",
				audioUrl: "/songs/7.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 30, // 0:30
			},
			{
				title: "Arjunaru Villu",
				artist: "Vidyasagar",
				imageUrl: "/cover-images/5.jpg",
				audioUrl: "/songs/5.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 29, // 0:29
			},
			{
				title: "Jailer Bgm",
				artist: "Anirudh",
				imageUrl: "/cover-images/15.jpg",
				audioUrl: "/songs/15.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 30, // 0:30
			},
			{
				title: "Rolex Bgm",
				artist: "Anirudh",
				imageUrl: "/cover-images/13.jpg",
				audioUrl: "/songs/13.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 29, // 0:29
			},
			{
				title: "Ella pugazhum",
				artist: "A.R. Rahman",
				imageUrl: "/cover-images/4.jpg",
				audioUrl: "/songs/4.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 29, // 0:29
			},
			{
				title: "Mun Sellada",
				artist: "Santhosh Narayanan",
				imageUrl: "/cover-images/9.jpg",
				audioUrl: "/songs/9.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 32, // 0:32
			},
			{
				title: "Kaathalenum",
				artist: "SPB",
				imageUrl: "/cover-images/16.jpg",
				audioUrl: "/songs/16.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 24, // 0:24
			},
			{
				title: "Veera Vinayaka",
				artist: "Anirudh",
				imageUrl: "/cover-images/10.jpg",
				audioUrl: "/songs/10.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 35, // 0:35
			},
			{
				title: "Malhari",
				artist: "Vishal Dadlani",
				imageUrl: "/cover-images/1.jpg",
				audioUrl: "/songs/1.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 30, // 0:30
			},
			{
				title: "295 Sidhu ",
				artist: "Sidhu Moosewala",
				imageUrl: "/cover-images/2.jpg",
				audioUrl: "/songs/2.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
			},
			{
				title: "Self Made",
				artist: "Sidhu Moosewala",
				imageUrl: "/cover-images/14.jpg",
				audioUrl: "/songs/14.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 21, // 0:21
			},
			{
				title: "Angaaron",
				artist: "Sherya Ghosal",
				imageUrl: "/cover-images/3.jpg",
				audioUrl: "/songs/3.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 35, // 0:35
			},
			{
				title: "Verihtanam",
				artist: "Vijay",
				imageUrl: "/cover-images/17.jpg",
				audioUrl: "/songs/17.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 31, // 0:31
			},
			{
				title: "Apana BanaLe",
				artist: "Arijit Singh",
				imageUrl: "/cover-images/12.jpg",
				audioUrl: "/songs/12.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 30, // 0:30
			},
		]);

		// Create albums with references to song IDs
		const albums = [
			{
				title: "Desi Flow",
				artist: "Various Artists",
				imageUrl: "/albums/1.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(0, 4).map((song) => song._id),
			},
			{
				title: "Hip-Hop Hindustan",
				artist: "Various Artists",
				imageUrl: "/albums/2.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(4, 8).map((song) => song._id),
			},
			{
				title: "Bollywood Bash",
				artist: "Various Artists",
				imageUrl: "/albums/3.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(8, 11).map((song) => song._id),
			},
			{
				title: "Filmy Vibes",
				artist: "Various Artists",
				imageUrl: "/albums/4.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(11, 14).map((song) => song._id),
			},
		];

		// Insert all albums
		const createdAlbums = await Album.insertMany(albums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;

			await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
		}

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();
