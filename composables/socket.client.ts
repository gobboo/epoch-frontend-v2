import { io, Socket } from "socket.io-client";
import { useToast } from "vue-toastification";
import { useAuth } from "~~/stores/auth";


class Client {
	protected url: string
	protected socket: Socket

	protected connected: boolean

	constructor (url: string) {
		this.url = url

		this.socket = this.connect()
		this.connected = false;
	}

	private connect (): Socket {

		const socket = io(this.url, {
			transportOptions: {
				polling: {
					extraHeaders: {
						Authorization: useAuth().accessToken
					}
				}
			}
		});

		// Check if the socket got connected
		socket.on('connect', () => {
			this.connected = true;
		});

		// Check if the socket got disconnected
		socket.on('disconnect', () => {
			this.connected = false;
		});

		return socket;
	}

	public reconnect (): void {
		this.socket = this.connect();
	}

	public isConnected (): boolean {
		return this.connected;
	}

	public getSocket (): Socket {
		return this.socket;
	}
	
	public emit (event: string, args: any, callback): void {
		this.socket.emit(event, args, (response: any) => {
			if (!response.success) {
				const toast = useToast();

				return toast.error(response.message);
			}

			callback(response);
		});
	}

	public on (event: string, callback: (...args: any[]) => void): void {
		this.socket.on(event, callback);
	}
}

export default Client;