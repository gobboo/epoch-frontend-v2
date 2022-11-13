import { io, Socket } from "socket.io-client";
import { useToast } from "vue-toastification";
import { useAuth } from "~~/stores/auth";


class Client {
	protected socket: Socket

	protected url: string
	protected connected: boolean

	constructor() { }

	public setUrl(url: string): void {
		this.url = url;
	}

	public connect(): void {
		this.socket = io(this.url, {
			transportOptions: {
				polling: {
					extraHeaders: {
						Authorization: useAuth().accessToken
					}
				}
			}
		});

		// Check if the socket got connected
		this.socket.on('connect', () => {
			this.connected = true;
		});

		// Check if the socket got disconnected
		this.socket.on('disconnect', () => {
			this.connected = false;
		});
	}

	public reconnect(): void {
		this.socket.connect();
	}

	public isConnected(): boolean {
		return this.connected;
	}

	public getSocket(): Socket {
		return this.socket;
	}

	public emit(event: string, args: any, callback): void {
		if (!this.connected) return;

		this.socket.emit(event, args, (response: any) => {
			if (!response.success) {
				const toast = useToast();

				return toast.error(response.message);
			}

			callback(response);
		});
	}

	public on(event: string, callback: (...args: any[]) => void): void {
		this.socket.on(event, callback);
	}
}

export default Client;