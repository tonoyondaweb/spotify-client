import { signIn } from "next-auth/react";
import { FaSpotify } from "react-icons/fa";

type Props = {};
export default function Login({}: Props) {
	return (
		<div className="h-screen flex flex-col justify-center items-center">
            <FaSpotify className="text-green-600 text-[7rem] mb-11" />
			<button
				className="text-gray-900 bg-green-800 border-[0.5px] border-green-600 p-2 rounded-md transition-colors hover:bg-green-600"
				onClick={() => signIn("spotify", { callbackUrl: "/" })}
			>
				Sign in with Spotify
			</button>
		</div>
	);
}
