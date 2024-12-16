import { Layout } from "@/components/layout"
import { TournamentDetail } from "@/components/tournament-detail"
import { tournaments } from "@/lib/data"
import { notFound } from "next/navigation"

export default function TournamentPage({ params }: { params: { url: string } }) {
  const tournament = tournaments.find((t) => t.url === params.url)
  
  if (!tournament) {
    notFound()
  }

  return (
    <Layout>
      <TournamentDetail tournament={tournament} />
    </Layout>
  )
}

