import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi from "../../../lib/spotify";

const scope =
	"user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private playlist-read-collaborative user-follow-read user-follow-modify user-top-read user-read-recently-played user-library-read user-read-email";

const refreshAccessToken = async (token: JWT) => {
	try {
		spotifyApi.setAccessToken(token.accessToken as string);
		spotifyApi.setRefreshToken(token.refreshToken as string);

		const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
		console.log(refreshedToken);

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		console.log(error);
		return {
			...token,
			error: "token refresh error",
		};
	}
};

export default NextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID as string,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
			authorization: { params: { scope } },
		}),
	],
	secret: process.env.JWT_SECRET,
	callbacks: {
		async jwt({ token, account, user }) {
			if (account && user) {
				return {
					accessToken: account.access_token,
					accessTokenExpires:
						Date.now() + (account.expires_at as number) * 1000,
					refreshToken: account.refresh_token,
					user,
				};
			}

			if (Date.now() < (token.accessTokenExpires as number)) {
				return token;
			}

			return await refreshAccessToken(token);
		},
		async session({ session, token }) {
			session.user = token.user;
            session.accessToken = token.accessToken
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
});
