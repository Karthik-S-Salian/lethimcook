import type { Actions, Cookies } from "@sveltejs/kit";
import {db} from "$lib/server/db"
import { userTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import { createAuthJWT } from "$lib/server/auth/jwt";
import { fail } from '@sveltejs/kit';

interface User {
	name: string,
	email: string,
	password: string
	id: number
}

async function setToken(user: User, cookies: Cookies) {
	const token = await createAuthJWT({
		name: user.name,
		email: user.email,
		id: user.id,
	});

	cookies.set("auth_token", token, {
		path: "/",
	});

	throw redirect(301, "/");
}

export async function load({ url, cookies, }) {
	if (cookies.get("auth_token")) {
		throw redirect(301, "/");
	}

	const login = url.searchParams.get("login");
	if (login) {
		return { login: true }
	}
	return { login: false }
}

export const actions: Actions = {
	signin: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString() || "";

		if (!email) {
			return fail(400, { email, missing: true });
		}

		const queryResult = await db
			.select({
				email: userTable.email,
				password: userTable.password,
				name: userTable.name,
				id: userTable.id,
			})
			.from(userTable)
			.where(eq(userTable.email, email))
			.limit(1);

		if (queryResult.length == 0) {
			return fail(400, { incorrect: true, isLogin: true });
		}

		const user = queryResult[0];

		if (!user || !bcrypt.compareSync(password,user.password)) {
			return fail(400, { incorrect: true, isLogin: true });
		}

		await setToken(user, cookies);
	},
	signup: async ({ cookies, request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const password = data.get('password');
		if (!email) {
			return fail(400, { email, missing: true });
		} else if (!name) {
			return fail(400, { name, missing: true });
		}

		if (!password) return;

		const hash = bcrypt.hashSync(password.toString(), 10);
		let user;

		try {
			const insertedUsers = await db.insert(userTable).values({
				name: name.toString(),
				email: email.toString(),
				password: hash,
			}).returning();

			if (insertedUsers.length > 0) {
				user = insertedUsers[0]
			} else {
				throw new Error("Could not insert");
			}

		} catch (error) {
			return fail(400, { exists: true })
		}

		await setToken(user, cookies)
	},
	signout: ({ cookies }) => {
		console.log("signout")
		cookies.delete("auth_token", {
			path: "/",
		})
		throw redirect(301, "/login");
	}
};