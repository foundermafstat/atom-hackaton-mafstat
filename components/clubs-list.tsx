"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Club } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ClubsListProps {
  clubs: Club[]
}

export function ClubsList({ clubs }: ClubsListProps) {
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
        {clubs.map((club) => (
          <Link key={club.id} href={`/clubs/${club.url}`}>
            <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
              <CardHeader>
                <CardTitle className="text-[#FF0000]">
                  {club.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <div className="space-y-2">
                  <div>Location: {club.location}</div>
                  <div>Members: {club.members}</div>
                  <div>Games Played: {club.gamesPlayed}</div>
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
            <TableHead className="text-white">NAME</TableHead>
            <TableHead className="text-white">LOCATION</TableHead>
            <TableHead className="text-white">MEMBERS</TableHead>
            <TableHead className="text-white">GAMES PLAYED</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clubs.map((club) => (
            <TableRow
              key={club.id}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
            >
              <TableCell>
                <Link href={`/clubs/${club.url}`} className="text-[#FF0000] hover:underline">
                  {club.name}
                </Link>
              </TableCell>
              <TableCell className="text-white">{club.location}</TableCell>
              <TableCell className="text-white">{club.members}</TableCell>
              <TableCell className="text-white">{club.gamesPlayed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

