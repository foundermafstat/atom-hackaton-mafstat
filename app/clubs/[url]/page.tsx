import { Layout } from "@/components/layout"
import { ClubDetail } from "@/components/club-detail"
import { clubs } from "@/lib/data"
import { notFound } from "next/navigation"

export default function ClubPage({ params }: { params: { url: string } }) {
  const club = clubs.find((c) => c.url === params.url)
  
  if (!club) {
    notFound()
  }

  return (
    <Layout>
      <ClubDetail club={club} />
    </Layout>
  )
}

