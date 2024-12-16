import { Layout } from "@/components/layout"
import { EnhancedPlayersTable } from "@/components/enhanced-players-table"
import { players } from "@/lib/data"

export default function PlayersPage() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bebas-neue text-white mb-6">PLAYERS</h1>
        <EnhancedPlayersTable players={players} />
      </div>
    </Layout>
  )
}

