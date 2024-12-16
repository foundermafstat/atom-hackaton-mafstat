"use client"

import Image from 'next/image'
import { Instagram, Send, TwitterIcon as TikTok, Trophy } from 'lucide-react'
import { Player } from "@/types"
import { AngularPattern } from './angular-pattern'
import { Card } from '@/components/ui/card'

interface PlayerProfileEnhancedProps {
  player: Player
}

export function PlayerProfileEnhanced({ player }: PlayerProfileEnhancedProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-black"
        style={{
          animation: 'gradient 15s ease infinite',
          backgroundSize: '400% 400%',
        }}
      >
        <AngularPattern />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="relative w-full md:w-1/3 aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 transform rotate-3" />
            <Image
              src={player.avatar || "/placeholder.svg"}
              alt={player.nickname}
              width={400}
              height={400}
              className="relative z-10 object-cover w-full h-full"
            />
            <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 text-white font-bold">
              MAFSTAT
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h1 className="text-5xl font-bold text-white">{player.nickname}</h1>
                <Image
                  src="/placeholder.svg?text=UA"
                  alt="Flag"
                  width={32}
                  height={24}
                  className="rounded"
                />
              </div>
              <h2 className="text-2xl text-gray-300">{player.realName}</h2>
              <div className="flex gap-4">
                <Instagram className="w-6 h-6 text-white hover:text-red-500 cursor-pointer" />
                <Send className="w-6 h-6 text-white hover:text-red-500 cursor-pointer" />
                <TikTok className="w-6 h-6 text-white hover:text-red-500 cursor-pointer" />
              </div>
              <p className="text-gray-300 max-w-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Stats Card */}
          <Card className="bg-gradient-to-br from-red-900 to-black p-6 transform hover:scale-105 transition-transform">
            <div className="space-y-4">
              <div className="text-6xl font-bold text-white">
                {player.stats.civilianWinrate}%
              </div>
              <div className="text-gray-300">
                <div>CIVILIAN WINRATE</div>
                <div className="text-2xl font-bold">
                  {player.stats.totalGames}/{player.stats.winGames}
                </div>
              </div>
              <div className="text-gray-300">
                RATING ELO
                <div className="text-2xl font-bold text-white">
                  {player.stats.ratingElo}
                </div>
              </div>
            </div>
          </Card>

          {/* Tournaments Card */}
          <Card className="bg-gradient-to-br from-red-900 to-black p-6 transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-white mb-4">MAFIA TOURNAMENTS</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{player.stats.tournaments.gold}</div>
                <div className="text-sm text-gray-300">Gold</div>
              </div>
              <div className="text-center">
                <Trophy className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{player.stats.tournaments.silver}</div>
                <div className="text-sm text-gray-300">Silver</div>
              </div>
              <div className="text-center">
                <Trophy className="w-8 h-8 text-yellow-700 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{player.stats.tournaments.bronze}</div>
                <div className="text-sm text-gray-300">Bronze</div>
              </div>
            </div>
          </Card>

          {/* Impact Stats Card */}
          <Card className="bg-gradient-to-br from-red-900 to-black p-6 transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-white mb-4">GAME IMPACT</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-gray-300 mb-1">
                  <span>Early Game</span>
                  <span>{player.stats.impact.early}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600 transition-all duration-500"
                    style={{ width: `${player.stats.impact.early}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-gray-300 mb-1">
                  <span>Mid Game</span>
                  <span>{player.stats.impact.mid}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600 transition-all duration-500"
                    style={{ width: `${player.stats.impact.mid}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-gray-300 mb-1">
                  <span>Late Game</span>
                  <span>{player.stats.impact.late}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600 transition-all duration-500"
                    style={{ width: `${player.stats.impact.late}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

