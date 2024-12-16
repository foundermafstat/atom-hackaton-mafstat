import { Layout } from "@/components/layout"
import { GamesList } from "@/components/games-list"
import { games } from "@/lib/data"

export default function GamesPage() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-white mb-6">GAMES</h1>
        <GamesList games={games} />
      </div>
    </Layout>
  )
}

