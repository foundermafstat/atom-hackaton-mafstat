"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"

interface SideNavProps {
  isOpen: boolean
  onClose: () => void
}

export function SideNav({ isOpen, onClose }: SideNavProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Side Navigation */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-[#FF0000] z-50 transform transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 text-white">
          <h2 className="text-xl font-bold mb-8">Player menu</h2>
          <nav className="space-y-4">
            <Link href="/games" className="block hover:bg-red-800 p-2 rounded">
              GAMES
            </Link>
            <Link href="/players" className="block hover:bg-red-800 p-2 rounded">
              PLAYERS
            </Link>
            <Link href="/clubs" className="block hover:bg-red-800 p-2 rounded">
              CLUBS
            </Link>
            <Link href="/ratings" className="block hover:bg-red-800 p-2 rounded">
              RATINGS
            </Link>
            <Link href="/tournaments" className="block hover:bg-red-800 p-2 rounded">
              TOURNAMENTS
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

