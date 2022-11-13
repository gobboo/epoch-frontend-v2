import { RouletteInfo } from './../types/interfaces';
import { useAuth } from './auth';
import { defineStore } from 'pinia'

interface JoinData {
	_id: string,
	user: {
		_id: string,
		username: string,
		avatar: string
	},
	bet: number,
	color: string
}

export const useRoulette = defineStore('roulette', {
	state: () => ({
		currentGame: {} as RouletteInfo
	}),
	actions: {
		async createListeners() {
			const { $socket } = useNuxtApp();

			if ($socket) {
				$socket.on('roulette:new', (game: RouletteInfo) => {
					this.currentGame = game;
				});

				$socket.on('roulette:joined', (data: JoinData) => {
						this.currentGame.players.push({
							user: data.user,
							bet: data.bet,
							color: data.color
						});
				});

				$socket.on('roulette:ended', async (data: RouletteInfo) => {
					this.currentGame = data;
				});
			}
		},

		async joinGame(deposit: number, color: string) {
			const { $socket } = useNuxtApp();

			$socket.emit('roulette:join', { deposit, color }, () => {
				useAuth().fetchUser();
			});
		}
	},
	persist: true
})