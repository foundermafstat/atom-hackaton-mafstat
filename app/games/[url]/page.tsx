import { Layout } from "@/components/layout"
import { GameDetail } from "@/components/game-detail"
import { games } from "@/lib/data"
import { notFound } from "next/navigation"

export default function GamePage({ params }: { params: { url: string } }) {
  const game = games.find((g) => g.url === params.url)
  
  if (!game) {
    notFound()
  }

  return (
    <Layout>
      <GameDetail game={game} />
    </Layout>
  )
}

