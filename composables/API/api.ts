import nuxtConfig from "~~/nuxt.config";
import { useAuth } from "~~/stores/auth";


export class API {
	static async fetchWithAuth (path, options?): Promise<any> {
		const config = useRuntimeConfig();

		const response = await $fetch(`${config.baseUrl}${path}`, {
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

		const response = await $fetch(`${config.baseUrl}${path}`, options || { });

		// TODO Handle errors

		return response;
	}
}