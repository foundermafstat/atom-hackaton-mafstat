export interface Game {
  id: string
  date: string
  time: string
  type: string
  club: string
  win: "CIVILIAN" | "MAFIA"
  table: number
  judge: string
  url: string
}

export interface Player {
  id: string
  nickname: string
  realName?: string
  club: string
  avatar?: string
  stats: {
    civilianWinrate: number
    totalGames: number
    winGames: number
    ratingElo: number
    averageExtraPoint: number
    firstBlood: number
    gameImpact: number
    bestCivilian: string
    tournaments: {
      gold: number
      silver: number
      bronze: number
    }
    league: {
      position: number
      medals: number
    }
    impact: {
      early: number
      mid: number
      late: number
    }
  }
  url: string
}

export interface Club {
  id: string
  name: string
  location: string
  description: string
  members: number
  gamesPlayed: number
  url: string
}

export interface Rating {
  id: string
  title: string
  description: string
  players: number
  lastUpdated: string
  url: string
}

export interface Tournament {
  id: string
  title: string
  date: string
  club: string
  players: number
  status: "upcoming" | "ongoing" | "completed"
  url: string
}

