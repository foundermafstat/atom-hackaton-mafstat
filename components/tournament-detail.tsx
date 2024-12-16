import { Tournament } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TournamentDetailProps {
  tournament: Tournament
}

export function TournamentDetail({ tournament }: TournamentDetailProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">{tournament.title}</h1>
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#FF0000]">Tournament Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><span className="font-bold">Date:</span> {tournament.date}</p>
            <p><span className="font-bold">Club:</span> {tournament.club}</p>
            <p><span className="font-bold">Players:</span> {tournament.players}</p>
            <p><span className="font-bold">Status:</span> {tournament.status}</p>
          </div>
        </CardContent>
      </Card>
      {/* Add more sections here for tournament brackets, results, etc. */}
    </div>
  )
}

