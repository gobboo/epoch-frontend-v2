import { DiceInfo } from "~/types/interfaces";
import { API } from "../api";

export class DiceService {

	static async fetchGames(): Promise<DiceInfo[]> {
		return await API.fetch(`/dice/all`);
	}
}