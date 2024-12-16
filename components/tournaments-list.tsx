"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Tournament } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TournamentsListProps {
  tournaments: Tournament[]
}

export function TournamentsList({ tournaments }: TournamentsListProps) {
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
        {tournaments.map((tournament) => (
          <Link key={tournament.id} href={`/tournaments/${tournament.url}`}>
            <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
              <CardHeader>
                <CardTitle className="text-[#FF0000]">
                  {tournament.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <div className="space-y-2">
                  <div>Date: {tournament.date}</div>
                  <div>Club: {tournament.club}</div>
                  <div>Players: {tournament.players}</div>
                  <div>Status: {tournament.status}</div>
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
            <TableHead className="text-white">DATE</TableHead>
            <TableHead className="text-white">CLUB</TableHead>
            <TableHead className="text-white">PLAYERS</TableHead>
            <TableHead className="text-white">STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tournaments.map((tournament) => (
            <TableRow
              key={tournament.id}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
            >
              <TableCell>
                <Link href={`/tournaments/${tournament.url}`} className="text-[#FF0000] hover:underline">
                  {tournament.title}
                </Link>
              </TableCell>
              <TableCell className="text-white">{tournament.date}</TableCell>
              <TableCell className="text-white">{tournament.club}</TableCell>
              <TableCell className="text-white">{tournament.players}</TableCell>
              <TableCell className="text-white">{tournament.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

