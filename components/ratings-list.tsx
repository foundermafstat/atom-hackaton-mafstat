"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Rating } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface RatingsListProps {
  ratings: Rating[]
}

export function RatingsList({ ratings }: RatingsListProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  if (isMobile) {
    return (
      <div className="space-y-4">
        {ratings.map((rating) => (
          <Link key={rating.id} href={`/ratings/${rating.url}`}>
            <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
              <CardHeader>
                <CardTitle className="text-[#FF0000]">
                  {rating.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <div className="space-y-2">
                  <div>{rating.description}</div>
                  <div>Players: {rating.players}</div>
                  <div>Last Updated: {rating.lastUpdated}</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-md border border-gray-800">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#FF0000]">
            <TableHead className="text-white">TITLE</TableHead>
            <TableHead className="text-white">DESCRIPTION</TableHead>
            <TableHead className="text-white">PLAYERS</TableHead>
            <TableHead className="text-white">LAST UPDATED</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ratings.map((rating) => (
            <TableRow
              key={rating.id}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
            >
              <TableCell>
                <Link href={`/ratings/${rating.url}`} className="text-[#FF0000] hover:underline">
                  {rating.title}
                </Link>
              </TableCell>
              <TableCell className="text-white">{rating.description}</TableCell>
              <TableCell className="text-white">{rating.players}</TableCell>
              <TableCell className="text-white">{rating.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

