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

export const useDice = defineStore('dice', {
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
					const game = this.games.find(game => game._id === data._id);

					if (game) {
						game.players.push({
							user: data.user,
							bet: data.bet,
							color: data.color
						});
					}
				});

				$socket.on('roulette:finished', async (data: RouletteInfo) => {
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