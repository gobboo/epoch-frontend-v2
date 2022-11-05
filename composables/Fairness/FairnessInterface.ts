
export interface Fairness {
	serverSeed: string;
	clientSeed: string;
	nonce: number;
	gameId: string;

	validate (serverSeed: string, clientSeed: string, nonce: number): boolean;

	getHash (): string;

	getGameId (): string;

	setClientSeed (clientSeed: string): void;

	setNonce (nonce: number): void;

	setServerSeed (serverSeed: string): void;

	setGameId (gameId: string): void;
}