import { getSession, signOut, useSession } from "next-auth/react";

type Props = {};
export default function Index({}: Props) {
	const { data: session } = useSession();
	console.log(session?.user);
	if (session)
		return (
			<div>
				<p>Hi, {session?.user?.name}</p>
				<button className="border p-1" onClick={() => signOut()}>Sign out</button>
			</div>
		);
}

export async function getServerSideProps(context: any) {
	const session = await getSession(context);
	const checkAuth = (session: any) => {
		if (
			!session ||
			Math.floor(Date.now()) >= (session.user as any).expires_at * 1000
		) {
			return false;
		}
		return true;
	};

	if (!checkAuth(session)) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
