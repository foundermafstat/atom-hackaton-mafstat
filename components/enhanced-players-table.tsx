"use client"

import { useState, useEffect } from "react"
import Link from 'next/link'
import { Player } from "@/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, SortAsc, SortDesc } from 'lucide-react'
import { GameGridCard } from "./game-grid-card"

interface EnhancedPlayersTableProps {
  players: Player[]
}

type SortField = 'mafstatScore' | 'winrate' | 'gamesPlayed' | 'rating'
type SortDirection = 'asc' | 'desc'

export function EnhancedPlayersTable({ players }: EnhancedPlayersTableProps) {
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState<SortField>('mafstatScore')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [ratingFilter, setRatingFilter] = useState("all")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const filteredPlayers = players
    .filter(player => {
      const matchesSearch = player.nickname.toLowerCase().includes(search.toLowerCase()) ||
                          player.realName?.toLowerCase().includes(search.toLowerCase())
      const matchesRating = ratingFilter === "all" ? true :
                           ratingFilter === "high" ? player.stats.ratingElo >= 1500 :
                           ratingFilter === "medium" ? player.stats.ratingElo >= 1000 && player.stats.ratingElo < 1500 :
                           player.stats.ratingElo < 1000

      return matchesSearch && matchesRating
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortField) {
        case 'mafstatScore':
          comparison = a.stats.civilianWinrate - b.stats.civilianWinrate
          break
        case 'winrate':
          comparison = (a.stats.winGames / a.stats.totalGames) - (b.stats.winGames / b.stats.totalGames)
          break
        case 'gamesPlayed':
          comparison = a.stats.totalGames - b.stats.totalGames
          break
        case 'rating':
          comparison = a.stats.ratingElo - b.stats.ratingElo
          break
      }
      return sortDirection === 'desc' ? -comparison : comparison
    })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-800 text-white"
          />
        </div>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-[180px] bg-gray-900 border-gray-800 text-white">
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-800">
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="high">High (1500+)</SelectItem>
            <SelectItem value="medium">Medium (1000-1499)</SelectItem>
            <SelectItem value="low">Low (&lt;1000)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isMobile ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPlayers.map((player) => (
            <GameGridCard key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FF0000] hover:bg-red-800">
                <TableHead className="text-white font-bebas-neue text-lg">NICKNAME</TableHead>
                <TableHead className="text-white font-bebas-neue text-lg">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      if (sortField === 'mafstatScore') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                      } else {
                        setSortField('mafstatScore')
                        setSortDirection('desc')
                      }
                    }}
                    className="text-white hover:text-white/90 p-0 font-bebas-neue text-lg"
                  >
                    MAFSTAT SCORE
                    {sortField === 'mafstatScore' && (
                      sortDirection === 'asc' ? <SortAsc className="ml-2 h-4 w-4" /> : <SortDesc className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="text-white font-bebas-neue text-lg">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      if (sortField === 'winrate') {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                      } else {
                        setSortField('winrate')
                        setSortDirection('desc')
                      }
                    }}
                    className="text-white hover:text-white/90 p-0 font-bebas-neue text-lg"
                  >
                    GAMES-WINS
                    {sortField === 'winrate' && (
                      sortDirection === 'asc' ? <SortAsc className="ml-2 h-4 w-4" /> : <SortDesc className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="text-white font-bebas-neue text-lg">AVERAGE ADDITIONAL</TableHead>
                <TableHead className="text-white font-bebas-neue text-lg">G-W WR CIV</TableHead>
                <TableHead className="text-white font-bebas-neue text-lg">G-W WR SHER</TableHead>
                <TableHead className="text-white font-bebas-neue text-lg">FOULS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlayers.map((player) => (
                <TableRow
                  key={player.id}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  <TableCell>
                    <Link href={`/players/${player.url}`} className="bg-[#FF0000] text-white px-2 py-1 rounded inline-block hover:bg-red-700 transition-colors">
                      {player.nickname}
                    </Link>
                  </TableCell>
                  <TableCell className="text-white">{player.stats.civilianWinrate.toFixed(2)}%</TableCell>
                  <TableCell>
                    <div className="text-white">
                      {player.stats.totalGames}/{player.stats.winGames}
                      <div className="w-full h-1 bg-gray-700 rounded-full mt-1">
                        <div
                          className="h-full bg-[#FF0000] rounded-full"
                          style={{
                            width: `${(player.stats.winGames / player.stats.totalGames) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{player.stats.averageExtraPoint.toFixed(3)}</TableCell>
                  <TableCell>
                    <div className="bg-black text-white px-2 py-1 rounded text-center">
                      {((player.stats.winGames / player.stats.totalGames) * 100).toFixed(1)}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="bg-[#FF0000] text-white px-2 py-1 rounded text-center">
                      {player.stats.impact.early}%
                    </div>
                  </TableCell>
                  <TableCell className="text-white text-center">{player.stats.tournaments.gold}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

