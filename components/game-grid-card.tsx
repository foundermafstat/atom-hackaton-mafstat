import Link from 'next/link'
import { Player } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface GameGridCardProps {
  player: Player
}

export function GameGridCard({ player }: GameGridCardProps) {
  return (
    <Link href={`/players/${player.url}`}>
      <Card className="bg-gray-900 hover:bg-gray-800 transition-colors">
        <CardHeader>
          <CardTitle className="text-[#FF0000] font-bebas-neue text-2xl">
            {player.nickname}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-white">
            <div>
              <p className="text-sm text-gray-400">MAFSTAT Score</p>
              <p className="font-bold">{player.stats.civilianWinrate.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Games-Wins</p>
              <p className="font-bold">{player.stats.totalGames}/{player.stats.winGames}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Rating ELO</p>
              <p className="font-bold">{player.stats.ratingElo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg Extra</p>
              <p className="font-bold">{player.stats.averageExtraPoint.toFixed(3)}</p>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-[#FF0000] rounded-full"
                style={{
                  width: `${(player.stats.winGames / player.stats.totalGames) * 100}%`
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

