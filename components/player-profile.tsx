import Image from 'next/image'
import { Player } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PlayerProfileProps {
  player: Player
}

export function PlayerProfile({ player }: PlayerProfileProps) {
  return (
    <div className="bg-[#1A1A1A] text-white">
      <div className="relative h-64 bg-gradient-to-r from-red-800 to-red-600">
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
          <div className="flex items-end space-x-4">
            <Image
              src={player.avatar || "/placeholder.svg"}
              alt={player.nickname}
              width={120}
              height={120}
              className="rounded-full border-4 border-white"
            />
            <div>
              <h1 className="text-4xl font-bold">{player.nickname}</h1>
              <p className="text-xl">{player.realName}</p>
              <p>Club: {player.club}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Overall Statistics</h2>
            <div className="space-y-4">
              <div>
                <p className="text-lg">Civilian Winrate</p>
                <Progress value={player.stats.civilianWinrate} className="h-2 bg-gray-600" />
                <p className="text-right">{player.stats.civilianWinrate.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-lg">Games Played</p>
                <p className="text-3xl font-bold">{player.stats.totalGames}</p>
              </div>
              <div>
                <p className="text-lg">Rating ELO</p>
                <p className="text-3xl font-bold">{player.stats.ratingElo}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Performance</h2>
            <div className="space-y-4">
              <div>
                <p className="text-lg">Average Extra Point</p>
                <p className="text-3xl font-bold">{player.stats.averageExtraPoint.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-lg">First Blood</p>
                <p className="text-3xl font-bold">{player.stats.firstBlood}%</p>
              </div>
              <div>
                <p className="text-lg">Game Impact</p>
                <Progress value={player.stats.gameImpact} className="h-2 bg-gray-600" />
                <p className="text-right">{player.stats.gameImpact}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Achievements</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">{player.stats.tournaments.gold}</p>
                <p>Gold</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-300">{player.stats.tournaments.silver}</p>
                <p>Silver</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-600">{player.stats.tournaments.bronze}</p>
                <p>Bronze</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-lg">League MAFSTAT</p>
              <p>Position: {player.stats.league.position}</p>
              <p>Medals: {player.stats.league.medals}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Game Impact</h2>
            <div className="space-y-4">
              <div>
                <p className="text-lg">Early Game Impact</p>
                <Progress value={player.stats.impact.early} className="h-2 bg-gray-600" />
                <p className="text-right">{player.stats.impact.early}%</p>
              </div>
              <div>
                <p className="text-lg">Mid Game Impact</p>
                <Progress value={player.stats.impact.mid} className="h-2 bg-gray-600" />
                <p className="text-right">{player.stats.impact.mid}%</p>
              </div>
              <div>
                <p className="text-lg">Late Game Impact</p>
                <Progress value={player.stats.impact.late} className="h-2 bg-gray-600" />
                <p className="text-right">{player.stats.impact.late}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

