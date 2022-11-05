import { useAuth } from './auth';
import { defineStore } from 'pinia'
import { DiceInfo } from '~/types/interfaces';
import { DiceService } from '~/composables/API/services/dice.service';

interface JoinData {
	_id: string,
	user: {
		_id: string,
		username: string,
		avatar: string,
		clientSeed: string
	}
}

export const useDice = defineStore('dice', {
	state: () => ({
		games: [] as DiceInfo[]
	}),
	actions: {
		async createListeners() {
			const { $socket } = useNuxtApp();

			if ($socket) {
				$socket.on('dice:created', (game: DiceInfo) => {
					this.games.push(game);
				});

				$socket.on('dice:joined', (data: JoinData) => {
					const game = this.games.find(game => game._id === data._id);

					if (game) {
						game.players.push({
							user: data.user,
							roll: 0
						});

						// If the game is full, change status to waiting for EOS
						if (game.players.length === game.maxPlayers) {
							game.status = 'started';
						}
					}
				});

				$socket.on('dice:finished', async (data: DiceInfo) => {
					const game = this.games.find(game => game._id === data._id);

					if (game) {
						game.players = data.players;
						game.status = 'finished';
						game.winner = data.winner;
						game.block = data.block;
						game.serverSeed = data.serverSeed;
						game.serverSeedHash = data.serverSeedHash;
						game.block = data.block;
					}

					const auth = useAuth();
					// If our logged in user is the winner, fetch the new balance
					if (auth.loggedIn && data.winner === auth.user._id) {
						await auth.fetchUser();
					}
				});
			}
		},

		async fetchGames () {
			this.games = await DiceService.fetchGames();
		},

		createGame (buyIn: number, maxPlayers: number) {
			const { $socket } = useNuxtApp();

			$socket.emit('dice:create', {
				buyIn: buyIn,
				maxPlayers: maxPlayers
			}, () => {
				useAuth().fetchUser();
			});
		},

		async joinGame (gameId: string) {
			const { $socket } = useNuxtApp();
			
			$socket.emit('dice:join', {
				gameId: gameId
			}, () => {
				useAuth().fetchUser();
			});
		}
	},
	persist: true
})