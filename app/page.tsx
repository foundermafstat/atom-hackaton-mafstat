import { Layout } from "@/components/layout"
import { BestPlayers } from "@/components/best-players"
import { players } from "@/lib/data"

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bebas-neue text-white mb-6">MAFSTAT IS A MAFIA GAME STATISTICS SYSTEM</h1>
        <div className="space-y-6 text-gray-300 max-w-3xl mb-12">
          <p>
            The MafStat system, has been designed to gather mafia game results in one location, to focus on and to illustrate
            the game statistics, of individual player results
          </p>
          <p>
            For referees and the club&apos;s organizers, the MafStat system provides modern tools for integration, for club
            tournaments and marathons
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <BestPlayers players={players} />
        </div>
      </div>
    </Layout>
  )
}

