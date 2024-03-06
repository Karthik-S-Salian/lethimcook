// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	type User = {
		name: string
		email: string;
		id: number;
	  };

	namespace App {
		// interface Error {}
		interface Locals {
			user:User|null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
