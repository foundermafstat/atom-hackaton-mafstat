import { Layout } from "@/components/layout"
import { ClubsList } from "@/components/clubs-list"
import { clubs } from "@/lib/data"

export default function ClubsPage() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-white mb-6">CLUBS</h1>
        <ClubsList clubs={clubs} />
      </div>
    </Layout>
  )
}

