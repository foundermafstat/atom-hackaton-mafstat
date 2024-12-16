import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

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

export function PlayerCard({ player }: { player: PlayerStats }) {
  return (
    <Card className="bg-gray-800 text-white mb-4">
      <CardHeader>
        <CardTitle>
          <span className="bg-[#FF0000] text-white px-2 py-1 rounded">
            {player.nickname}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <span className="font-bold">MAFSTAT Score:</span> {player.mafstatScore}
        </div>
        <div>
          <span className="font-bold">Games-Wins:</span> {player.gamesWins.total}
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-[#FF0000]"
              style={{ width: `${player.gamesWins.percentage}%` }}
            />
          </div>
          <span className="text-sm text-gray-400">{player.gamesWins.percentage}%</span>
        </div>
        <div>
          <span className="font-bold">Average Additional:</span> {player.averageAdditional}
        </div>
        <div>
          <span className="font-bold">Civilian:</span> {player.civilianStats.wins}
          <ResponsiveContainer width="100%" height={20}>
            <BarChart data={[{ value: player.civilianStats.percentage }]}>
              <Bar dataKey="value" fill="#FF0000" />
            </BarChart>
          </ResponsiveContainer>
          <span className="text-sm text-gray-400">{player.civilianStats.percentage}%</span>
        </div>
        <div>
          <span className="font-bold">Sheriff:</span> {player.sheriffStats.wins}
          <ResponsiveContainer width="100%" height={20}>
            <BarChart data={[{ value: player.sheriffStats.percentage }]}>
              <Bar dataKey="value" fill="#FF0000" />
            </BarChart>
          </ResponsiveContainer>
          <span className="text-sm text-gray-400">{player.sheriffStats.percentage}%</span>
        </div>
        <div>
          <span className="font-bold">Mafia:</span> {player.mafiaStats.wins}
          <ResponsiveContainer width="100%" height={20}>
            <BarChart data={[{ value: player.mafiaStats.percentage }]}>
              <Bar dataKey="value" fill="#FF0000" />
            </BarChart>
          </ResponsiveContainer>
          <span className="text-sm text-gray-400">{player.mafiaStats.percentage}%</span>
        </div>
        <div>
          <span className="font-bold">Don:</span> {player.donStats.wins}
          <ResponsiveContainer width="100%" height={20}>
            <BarChart data={[{ value: player.donStats.percentage }]}>
              <Bar dataKey="value" fill="#FF0000" />
            </BarChart>
          </ResponsiveContainer>
          <span className="text-sm text-gray-400">{player.donStats.percentage}%</span>
        </div>
        <div>
          <span className="font-bold">Fouls:</span> {player.fouls}
        </div>
      </CardContent>
    </Card>
  )
}

