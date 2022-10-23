import { API } from "../api";
import { User } from "../types/auth.types";

export class AuthService {

	static async login(strategy: string, code: string): Promise<string> {
		const response = await API.fetch(`/auth/${strategy}?${code}`);

		return response.accessToken;
	}

	static async me(): Promise<User> {
		return await API.fetchWithAuth(`/auth/user`);
	}
}