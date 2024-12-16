import { Layout } from "@/components/layout"
import { TournamentsList } from "@/components/tournaments-list"
import { tournaments } from "@/lib/data"

export default function TournamentsPage() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-white mb-6">TOURNAMENTS</h1>
        <TournamentsList tournaments={tournaments} />
      </div>
    </Layout>
  )
}

