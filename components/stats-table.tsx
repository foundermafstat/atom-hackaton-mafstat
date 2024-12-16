"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { PlayerCard } from "./player-card"

interface PlayerStats {
  nickname: string
  mafstatScore: number
  gamesWins: {
    total: number
    percentage: number
  }
  averageAdditional: number
  civilianStats: {
    wins: string
    percentage: number
  }
  sheriffStats: {
    wins: string
    percentage: number
  }
  mafiaStats: {
    wins: string
    percentage: number
  }
  donStats: {
    wins: string
    percentage: number
  }
  fouls: number
}

const data: PlayerStats[] = [
  {
    nickname: "KNOPA",
    mafstatScore: 52.53,
    gamesWins: {
      total: 204,
      percentage: 47.06
    },
    averageAdditional: 0.04,
    civilianStats: {
      wins: "125-56",
      percentage: 44.8
    },
    sheriffStats: {
      wins: "15-9",
      percentage: 60
    },
    mafiaStats: {
      wins: "41-21",
      percentage: 31.32
    },
    donStats: {
      wins: "23-10",
      percentage: 43.48
    },
    fouls: 266
  },
  // Add more player data here as needed
]

export function StatsTable() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  if (isMobile) {
    return (
      <div className="space-y-4">
        {data.map((player) => (
          <PlayerCard key={player.nickname} player={player} />
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#FF0000] text-white">
            <TableHead className="text-white">NICKNAME</TableHead>
            <TableHead className="text-white">MAFSTAT SCORE</TableHead>
            <TableHead className="text-white">GAMES-WINS</TableHead>
            <TableHead className="text-white">AVERAGE ADDITIONAL</TableHead>
            <TableHead className="text-white">G-W WR CIV</TableHead>
            <TableHead className="text-white">G-W WR SHER</TableHead>
            <TableHead className="text-white">G-W WR MAF</TableHead>
            <TableHead className="text-white">G-W WR DON</TableHead>
            <TableHead className="text-white">FOULS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((player) => (
            <TableRow key={player.nickname} className="border-b border-gray-800">
              <TableCell>
                <span className="bg-[#FF0000] text-white px-2 py-1 rounded">
                  {player.nickname}
                </span>
              </TableCell>
              <TableCell className="text-white">{player.mafstatScore}</TableCell>
              <TableCell>
                <div className="text-white">
                  {player.gamesWins.total}
                  <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF0000]"
                      style={{ width: `${player.gamesWins.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400">{player.gamesWins.percentage}%</span>
                </div>
              </TableCell>
              <TableCell className="text-white">{player.averageAdditional}</TableCell>
              <TableCell>
                <div className="text-white">
                  {player.civilianStats.wins}
                  <ResponsiveContainer width="100%" height={20}>
                    <BarChart data={[{ value: player.civilianStats.percentage }]}>
                      <Bar dataKey="value" fill="#FF0000" />
                    </BarChart>
                  </ResponsiveContainer>
                  <span className="text-sm text-gray-400">{player.civilianStats.percentage}%</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-white">
                  {player.sheriffStats.wins}
                  <ResponsiveContainer width="100%" height={20}>
                    <BarChart data={[{ value: player.sheriffStats.percentage }]}>
                      <Bar dataKey="value" fill="#FF0000" />
                    </BarChart>
                  </ResponsiveContainer>
                  <span className="text-sm text-gray-400">{player.sheriffStats.percentage}%</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-white">
                  {player.mafiaStats.wins}
                  <ResponsiveContainer width="100%" height={20}>
                    <BarChart data={[{ value: player.mafiaStats.percentage }]}>
                      <Bar dataKey="value" fill="#FF0000" />
                    </BarChart>
                  </ResponsiveContainer>
                  <span className="text-sm text-gray-400">{player.mafiaStats.percentage}%</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-white">
                  {player.donStats.wins}
                  <ResponsiveContainer width="100%" height={20}>
                    <BarChart data={[{ value: player.donStats.percentage }]}>
                      <Bar dataKey="value" fill="#FF0000" />
                    </BarChart>
                  </ResponsiveContainer>
                  <span className="text-sm text-gray-400">{player.donStats.percentage}%</span>
                </div>
              </TableCell>
              <TableCell className="text-white">{player.fouls}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

