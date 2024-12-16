import { Rating } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface RatingDetailProps {
  rating: Rating
}

export function RatingDetail({ rating }: RatingDetailProps) {
  // This is mock data. In a real application, this would come from the API or database
  const topPlayers = [
    { rank: 1, name: "Player 1", score: 1500 },
    { rank: 2, name: "Player 2", score: 1450 },
    { rank: 3, name: "Player 3", score: 1400 },
    { rank: 4, name: "Player 4", score: 1350 },
    { rank: 5, name: "Player 5", score: 1300 },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">{rating.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-xl text-[#FF0000]">Rating Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-bold">Description:</span> {rating.description}</p>
              <p><span className="font-bold">Players:</span> {rating.players}</p>
              <p><span className="font-bold">Last Updated:</span> {rating.lastUpdated}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-xl text-[#FF0000]">Top Players</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#FF0000]">
                  <TableHead className="text-white">Rank</TableHead>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPlayers.map((player) => (
                  <TableRow key={player.rank} className="border-b border-gray-700">
                    <TableCell className="text-white">{player.rank}</TableCell>
                    <TableCell className="text-white">{player.name}</TableCell>
                    <TableCell className="text-white">{player.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-gray-800 text-white mt-6">
        <CardHeader>
          <CardTitle className="text-xl text-[#FF0000]">Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <p>A chart or graph showing the distribution of ratings would be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

