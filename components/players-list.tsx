"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Player } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface PlayersListProps {
  players: Player[]
}

export function PlayersList({ players }: PlayersListProps) {
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
        {players.map((player) => (
          <Link key={player.id} href={`/players/${player.url}`}>
            <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
              <CardHeader>
                <CardTitle className="text-[#FF0000]">
                  {player.nickname}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <div className="space-y-2">
                  <div>Club: {player.club}</div>
                  <div>Rating: {player.stats.ratingElo}</div>
                  <div>Win Rate: {player.stats.civilianWinrate.toFixed(2)}%</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-md border border-gray-800">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#FF0000]">
            <TableHead className="text-white">NICKNAME</TableHead>
            <TableHead className="text-white">CLUB</TableHead>
            <TableHead className="text-white">RATING</TableHead>
            <TableHead className="text-white">WIN RATE</TableHead>
            <TableHead className="text-white">TOTAL GAMES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow
              key={player.id}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
            >
              <TableCell>
                <Link href={`/players/${player.url}`} className="text-[#FF0000] hover:underline">
                  {player.nickname}
                </Link>
              </TableCell>
              <TableCell className="text-white">{player.club}</TableCell>
              <TableCell className="text-white">{player.stats.ratingElo}</TableCell>
              <TableCell className="text-white">{player.stats.civilianWinrate.toFixed(2)}%</TableCell>
              <TableCell className="text-white">{player.stats.totalGames}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

