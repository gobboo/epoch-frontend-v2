import { Fairness } from './FairnessInterface';

export class MineFairness implements Fairness {
	
	validate(serverSeed: string, clientSeed: string, nonce: number): boolean {
		return ;
	}
}