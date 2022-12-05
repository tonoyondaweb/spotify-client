import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: "/",
});

export default spotifyApi;
