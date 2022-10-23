import { useAuth } from "~~/stores/auth";


export class API {
	static async fetchWithAuth (path, options?): Promise<any> {
		const config = useRuntimeConfig();

		const response = await $fetch(`${config.public.BASE_URL}${path}`, {
			...options,
			headers: {
				Authorization: `Bearer ${useAuth().accessToken}`
			}
		});

		// TODO Handle errors

		return response;
	}

	static async fetch (path, options?): Promise<any> {
		const config = useRuntimeConfig();

		const response = await $fetch(`${config.public.BASE_URL}${path}`, options || { });

		// TODO Handle errors

		return response;
	}
}