import { Layout } from "@/components/layout"
import { PlayerComparison } from "@/components/player-comparison"
import { players } from "@/lib/data"

export default function PlayerComparisonPage() {
  // For this example, we'll compare the first two players in our data
  const player1 = players[0]
  const player2 = players[1]

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bebas-neue text-white mb-6">Player Comparison</h1>
        <h2 className="text-2xl font-bebas-neue text-white mb-4">
          {player1.nickname} vs {player2.nickname}
        </h2>
        <PlayerComparison player1={player1} player2={player2} />
      </div>
    </Layout>
  )
}

