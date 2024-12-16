"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Game } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface GamesListProps {
  games: Game[]
}

export function GamesList({ games }: GamesListProps) {
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
        {games.map((game) => (
          <Link key={game.id} href={`/games/${game.url}`}>
            <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
              <CardHeader>
                <CardTitle className="text-[#FF0000]">
                  {game.date}, {game.type}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <div className="space-y-2">
                  <div>Club: {game.club}</div>
                  <div>Time: {game.time}</div>
                  <div>Winner: {game.win}</div>
                  <div>Judge: {game.judge}</div>
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
            <TableHead className="text-white">GAME</TableHead>
            <TableHead className="text-white">WIN</TableHead>
            <TableHead className="text-white">DATE</TableHead>
            <TableHead className="text-white">TIME</TableHead>
            <TableHead className="text-white">TABLE</TableHead>
            <TableHead className="text-white">JUDGE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => (
            <TableRow
              key={game.id}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
            >
              <TableCell>
                <Link href={`/games/${game.url}`} className="text-[#FF0000] hover:underline">
                  {game.date}, {game.type}
                </Link>
                <div className="text-gray-400">{game.club}</div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded ${
                  game.win === "CIVILIAN" ? "bg-[#FF0000]" : "bg-black"
                } text-white`}>
                  {game.win}
                </span>
              </TableCell>
              <TableCell className="text-white">{game.date}</TableCell>
              <TableCell className="text-white">{game.time}</TableCell>
              <TableCell className="text-white">{game.table}</TableCell>
              <TableCell>
                <span className="text-[#FF0000]">{game.judge}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

