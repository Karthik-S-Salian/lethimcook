import type { MiddlewareHandler } from "astro";
import { verifyAuthJWT } from "./lib/server/auth/jwt";


export const  onRequest:MiddlewareHandler =  async ({ locals,url,cookies,redirect}, next) =>{
    const token = cookies.get("auth_token");
    const user = token?(await verifyAuthJWT(token.value)):null;

    if (url.pathname.includes('auth')) {
        if(user){
          return redirect("/");
        }
        return next();
      }

    if(url.pathname=="/"){
      return next();
    }

    if(!user){
      cookies.delete("auth_token",{path:"/"})
        return redirect("/auth/signin", 301)
    }

    locals.user = user;

    return next();
};