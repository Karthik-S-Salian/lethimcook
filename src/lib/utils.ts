import { createAuthJWT } from "./server/auth/jwt";
import type { AstroCookies } from "astro";

export async function setToken(user: User, cookies:AstroCookies) {
	const token = await createAuthJWT({
		name: user.name,
		email: user.email,
		id: user.id,
	});

	cookies.set("auth_token", token, {
		path: "/",
	});
}