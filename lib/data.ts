import { Player, Club, Rating, Tournament, Game } from "@/types"

export const players: Player[] = [
  // Existing players...
  {
    id: "4",
    nickname: "SILENTASSASSIN",
    realName: "Liam O'Connor",
    club: "MAFSTAT DUBLIN",
    stats: {
      civilianWinrate: 59.75,
      totalGames: 1800,
      winGames: 1075,
      ratingElo: 1680,
      averageExtraPoint: 0.467,
      firstBlood: 13,
      gameImpact: 70,
      bestCivilian: "105/160",
      tournaments: { gold: 9, silver: 11, bronze: 6 },
      league: { position: 4, medals: 2 },
      impact: { early: 40, mid: 60, late: 69 }
    },
    url: "silentassassin"
  },
  {
    id: "5",
    nickname: "REDQUEEN",
    realName: "Sophia Rodriguez",
    club: "MAFSTAT MADRID",
    stats: {
      civilianWinrate: 62.10,
      totalGames: 2200,
      winGames: 1366,
      ratingElo: 1725,
      averageExtraPoint: 0.501,
      firstBlood: 16,
      gameImpact: 73,
      bestCivilian: "118/180",
      tournaments: { gold: 11, silver: 9, bronze: 8 },
      league: { position: 2, medals: 3 },
      impact: { early: 47, mid: 64, late: 72 }
    },
    url: "redqueen"
  },
  // ... Add 5 more players here
]

export const clubs: Club[] = [
  {
    id: "1",
    name: "MAFSTAT BARCELONA",
    location: "Barcelona, Spain",
    description: "The original MAFSTAT club, known for intense gameplay and strategic mastery.",
    members: 150,
    gamesPlayed: 1200,
    url: "mafstat-barcelona"
  },
  {
    id: "2",
    name: "MAFSTAT LONDON",
    location: "London, UK",
    description: "Home to some of the most cunning players in the MAFSTAT network.",
    members: 120,
    gamesPlayed: 980,
    url: "mafstat-london"
  },
  // ... Add 8 more clubs here
]

export const ratings: Rating[] = [
  {
    id: "1",
    title: "Global MAFSTAT Rankings - December 2024",
    description: "Monthly global player rankings across all MAFSTAT clubs",
    players: 1000,
    lastUpdated: "2024-12-01",
    url: "global-rankings-dec-2024"
  },
  {
    id: "2",
    title: "European Circuit Rankings - Q4 2024",
    description: "Quarterly rankings for the European MAFSTAT circuit",
    players: 500,
    lastUpdated: "2024-12-15",
    url: "european-circuit-q4-2024"
  },
  // ... Add 8 more ratings here
]

export const tournaments: Tournament[] = [
  {
    id: "1",
    title: "MAFSTAT World Championship 2025",
    date: "2025-07-15",
    club: "MAFSTAT BARCELONA",
    players: 128,
    status: "upcoming",
    url: "world-championship-2025"
  },
  {
    id: "2",
    title: "London Fog Invitational",
    date: "2025-03-20",
    club: "MAFSTAT LONDON",
    players: 64,
    status: "upcoming",
    url: "london-fog-invitational-2025"
  },
  // ... Add 8 more tournaments here
]

export const games: Game[] = [
  {
    id: "1",
    date: "2024-12-06",
    time: "23:44",
    type: "ОБЫЧНАЯ",
    club: "MAFSTAT BARCELONA",
    win: "CIVILIAN",
    table: 1,
    judge: "ЛЕОПОЛЬДА",
    url: "2024-12-06-game-1"
  },
  {
    id: "2",
    date: "2024-12-06",
    time: "22:37",
    type: "ОБЫЧНАЯ",
    club: "MAFSTAT LONDON",
    win: "MAFIA",
    table: 2,
    judge: "SHADOWHUNTER",
    url: "2024-12-06-game-2"
  },
  // ... Add 8 more games here
]

