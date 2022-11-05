import { useAuth } from "~/stores/auth";


export class API {
	static async fetchWithAuth (path, options?): Promise<any> {
		try {
			const config = useRuntimeConfig();

			const response = await $fetch(`${config.public.BASE_URL}${path}`, {
				...options,
				headers: {
					Authorization: `Bearer ${useAuth().accessToken}`
				}
			});
	
			// TODO Handle errors
	
			return response;
		} catch (err) {
			// Most likely the token expired
			const auth = useAuth();
			auth.logout();
		}
	}

	static async fetch (path, options?): Promise<any> {
		const config = useRuntimeConfig();

		const response = await $fetch(`${config.public.BASE_URL}${path}`, options || { });

		// TODO Handle errors

		return response;
	}
}