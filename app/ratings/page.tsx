import { Layout } from "@/components/layout"
import { RatingsList } from "@/components/ratings-list"
import { ratings } from "@/lib/data"

export default function RatingsPage() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-white mb-6">RATINGS</h1>
        <RatingsList ratings={ratings} />
      </div>
    </Layout>
  )
}

