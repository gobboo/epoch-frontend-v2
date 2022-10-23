

export interface MineInfo {
  _id: string
  user: string
  serverSeedHash: string
  nonce: number
  bets: Bet[]
  info: Info
  status: string
	potentialWin: number | 0
}

export interface Bet {
  user: string
  deposit: number
}

export interface Info {
  mineCount: number
  tilesTurned: number[],
	minePositions: number[] | undefined,
}