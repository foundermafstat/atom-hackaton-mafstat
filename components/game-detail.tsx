import { Game } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface GameDetailProps {
  game: Game
}

export function GameDetail({ game }: GameDetailProps) {
  return (
    <div className="bg-[#1A1A1A] text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">{game.date}, {game.type}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-[#FF0000]">Game Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-bold">Club:</span> {game.club}</p>
                <p><span className="font-bold">Date:</span> {game.date}</p>
                <p><span className="font-bold">Time:</span> {game.time}</p>
                <p><span className="font-bold">Table:</span> {game.table}</p>
                <p><span className="font-bold">Judge:</span> <span className="text-[#FF0000]">{game.judge}</span></p>
                <p>
                  <span className="font-bold">Winner:</span> 
                  <span className={`ml-2 px-2 py-1 rounded ${
                    game.win === "CIVILIAN" ? "bg-[#FF0000]" : "bg-black"
                  }`}>
                    {game.win}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-[#FF0000]">Player Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#FF0000]">
                    <TableHead className="text-white">#</TableHead>
                    <TableHead className="text-white">NICKNAME</TableHead>
                    <TableHead className="text-white">ROLE</TableHead>
                    <TableHead className="text-white">WIN</TableHead>
                    <TableHead className="text-white">EXTRA</TableHead>
                    <TableHead className="text-white">FOUL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Placeholder data - replace with actual game results */}
                  {[...Array(10)].map((_, index) => (
                    <TableRow key={index} className="border-b border-gray-700">
                      <TableCell className="text-white">{index + 1}</TableCell>
                      <TableCell>
                        <span className="bg-[#FF0000] text-white px-2 py-1 rounded">
                          PLAYER_{index + 1}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded ${
                          index < 7 ? "bg-[#FF0000]" : "bg-black"
                        } text-white`}>
                          {index < 7 ? "CIVILIAN" : index === 7 ? "SHERIFF" : "MAFIA"}
                        </span>
                      </TableCell>
                      <TableCell className="text-white">{index < 7 ? "1" : "0"}</TableCell>
                      <TableCell className="text-white">{(Math.random() * 0.5).toFixed(1)}</TableCell>
                      <TableCell className="text-white">{Math.floor(Math.random() * 3)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800 mt-6">
          <CardHeader>
            <CardTitle className="text-xl text-[#FF0000]">Game Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white">First blood: {Math.floor(Math.random() * 10) + 1}</p>
            <p className="text-white">Best move: [{Math.floor(Math.random() * 10) + 1}, {Math.floor(Math.random() * 10) + 1}, {Math.floor(Math.random() * 10) + 1}]</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

