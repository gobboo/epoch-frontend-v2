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

export interface DiceInfo {
  _id: string;
  creator: User;
  winner: string;
  nonce: number;
  buyIn: number;
  maxPlayers: number;
  players: [
    {
      user: User,
      roll: number
    }
  ]
  status: string;
  serverSeed: string;
  serverSeedHash: string;
  block: {
    hash: string,
    number: number,
    timestamp: number
  };
}

export interface RouletteInfo {
  _id: string;
  players: [
    {
      user: User,
      bet: number,
      color: string
    }
  ];
  status: string;
  serverSeed: string;
  serverSeedHash: string;
  publicSeed: string;
  roll: number;
}

export interface DiceBet {
  user: string,
  roll: number,
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

export interface User {
  _id: string
  username: string
  avatar: string
  clientSeed: string;
}