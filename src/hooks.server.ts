import { verifyAuthJWT } from '$lib/server/auth/jwt';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve}) {

    if (event.url.pathname.startsWith('/login')) {
        return resolve(event)
      }

    const token = event.cookies.get("auth_token");
    const user = token?(await verifyAuthJWT(token)):null;

    if(!user){
      event.cookies.delete("auth_token",{path:"/"})
        throw redirect(301,"/login");
    }

    event.locals.user = user;

    return resolve(event)
  }