import { PlayerProfileEnhanced } from "@/components/player-profile-enhanced"
import { players } from "@/lib/data"
import { notFound } from "next/navigation"

export default function PlayerPage({ params }: { params: { url: string } }) {
  const player = players.find((p) => p.url === params.url)
  
  if (!player) {
    notFound()
  }

  return <PlayerProfileEnhanced player={player} />
}

