import { io, Socket } from "socket.io-client";
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
	
	public emit (event: string, ...args: any[]): void {
		this.socket.emit(event, ...args);
	}
}

export default Client;