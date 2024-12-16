import { Layout } from "@/components/layout"
import { RatingDetail } from "@/components/rating-detail"
import { ratings } from "@/lib/data"
import { notFound } from "next/navigation"

export default function RatingPage({ params }: { params: { url: string } }) {
  const rating = ratings.find((r) => r.url === params.url)
  
  if (!rating) {
    notFound()
  }

  return (
    <Layout>
      <RatingDetail rating={rating} />
    </Layout>
  )
}

