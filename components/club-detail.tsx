import { Club } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ClubDetailProps {
  club: Club
}

export function ClubDetail({ club }: ClubDetailProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">{club.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-xl text-[#FF0000]">Club Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-bold">Location:</span> {club.location}</p>
              <p><span className="font-bold">Members:</span> {club.members}</p>
              <p><span className="font-bold">Games Played:</span> {club.gamesPlayed}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-xl text-[#FF0000]">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{club.description}</p>
          </CardContent>
        </Card>
      </div>
      {/* You can add more sections here, such as recent games, top players, etc. */}
      <Card className="bg-gray-800 text-white mt-6">
        <CardHeader>
          <CardTitle className="text-xl text-[#FF0000]">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Recent games and events will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

