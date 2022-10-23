import { defineStore } from 'pinia'
import { AuthService } from '@/composables/API/services/auth.service';
import { User } from '~~/composables/API/types/auth.types';

export const useAuth = defineStore('auth', {
  state: () => ({
		user: {} as User,
		accessToken: '',
		loggedIn: false
	}),
  actions: {
		async submitCode (strategy, code) {
			const accessToken: string = await AuthService.login(strategy, code);

			if (accessToken) {
				this.accessToken = accessToken;
			}

			await this.fetchUser();
			// TODO Reconnect socket with user as handshake
		},

		async fetchUser () {
			const user: User = await AuthService.me();

			if (user) {
				this.user = user;
				this.loggedIn = true;
			} else {
				this.loggedIn = false;
				this.user = {};
			}

			const { $socket } = useNuxtApp();
			$socket.reconnect();
		},

		logout () {
			this.user = {};
			this.loggedIn = false;
			this.accessToken = '';

			const { $socket } = useNuxtApp();
			$socket.reconnect();
		}
  },
	persist: true
})