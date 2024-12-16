"use client"

import Image from "next/image"
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

interface BestPlayersProps {
  players: Player[]
}

export function BestPlayers({ players }: BestPlayersProps) {
  const topPlayers = players
    .sort((a, b) => b.stats.ratingElo - a.stats.ratingElo)
    .slice(0, 10)

  return (
    <Card className="bg-black border-gray-800">
      <CardHeader className="text-center">
        <CardTitle className="text-white font-bebas-neue text-4xl tracking-wide">
          ТУРНИРНАЯ ТАБЛИЦА
        </CardTitle>
        <p className="text-gray-400">Итоги игры: {topPlayers.length}</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-800">
              <TableHead className="text-gray-400 font-normal w-12">#</TableHead>
              <TableHead className="text-gray-400 font-normal">Игрок</TableHead>
              <TableHead className="text-gray-400 font-normal text-right">Очки</TableHead>
              <TableHead className="text-gray-400 font-normal text-right">Доп. о.</TableHead>
              <TableHead className="text-gray-400 font-normal text-right">ЛХ</TableHead>
              <TableHead className="text-gray-400 font-normal text-right">Ci</TableHead>
              <TableHead className="text-gray-400 font-normal text-right">Ш (ЖК)</TableHead>
              <TableHead className="text-gray-400 font-normal text-right">Всего</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topPlayers.map((player, index) => (
              <TableRow 
                key={player.id}
                className="border-b border-gray-800 hover:bg-gray-900/50"
              >
                <TableCell className="text-gray-400 font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                      <Image
                        src={player.avatar || "/placeholder.svg"}
                        alt={player.nickname}
                        fill
                        className="rounded-full object-cover"
                      />
                      <div className="absolute -right-1 -bottom-1 bg-[#FF0000] text-white text-xs px-1 rounded">
                        {index < 3 ? 'I' : 'M'}
                      </div>
                    </div>
                    <span className="text-white font-medium">{player.nickname}</span>
                  </div>
                </TableCell>
                <TableCell className="text-white text-right">
                  {(player.stats.civilianWinrate / 25).toFixed(1)}
                </TableCell>
                <TableCell className="text-white text-right">
                  {player.stats.averageExtraPoint.toFixed(2)}
                </TableCell>
                <TableCell className="text-white text-right">
                  {(player.stats.firstBlood / 10).toFixed(2)}
                </TableCell>
                <TableCell className="text-white text-right">
                  {(player.stats.gameImpact / 25).toFixed(2)}
                </TableCell>
                <TableCell className="text-white text-right">
                  {(player.stats.impact.early / 25).toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-white font-bold text-xl">
                    {(
                      player.stats.civilianWinrate / 25 +
                      player.stats.averageExtraPoint +
                      player.stats.firstBlood / 10 +
                      player.stats.gameImpact / 25 +
                      player.stats.impact.early / 25
                    ).toFixed(2)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

