"use client"

import { useState } from 'react'
import { Player } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import styles from './player-comparison.module.scss'

interface PlayerComparisonProps {
  player1: Player
  player2: Player
}

// Mock data for e-rating changes over time
const eRatingData = [
  { date: '2023-01', player1: 1500, player2: 1450 },
  { date: '2023-02', player1: 1520, player2: 1480 },
  { date: '2023-03', player1: 1510, player2: 1500 },
  { date: '2023-04', player1: 1540, player2: 1490 },
  { date: '2023-05', player1: 1560, player2: 1520 },
  { date: '2023-06', player1: 1580, player2: 1540 },
]

export function PlayerComparison({ player1, player2 }: PlayerComparisonProps) {
  const [focusBar, setFocusBar] = useState<string | null>(null)

  const radarData = [
    { subject: 'Win Rate', A: player1.stats.civilianWinrate, B: player2.stats.civilianWinrate, fullMark: 100 },
    { subject: 'Accuracy', A: player1.stats.gameImpact, B: player2.stats.gameImpact, fullMark: 100 },
    { subject: 'First Blood', A: player1.stats.firstBlood, B: player2.stats.firstBlood, fullMark: 100 },
    { subject: 'Early Impact', A: player1.stats.impact.early, B: player2.stats.impact.early, fullMark: 100 },
    { subject: 'Late Impact', A: player1.stats.impact.late, B: player2.stats.impact.late, fullMark: 100 },
  ]

  return (
    <div className={styles.comparisonContainer}>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className={styles.cardTitle}>E-Rating Changes Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={eRatingData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPlayer1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF0000" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPlayer2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00C49F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#888888" />
                <YAxis stroke="#888888" />
                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  itemStyle={{ color: '#E5E7EB' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="player1" 
                  stroke="#FF0000" 
                  fillOpacity={1} 
                  fill="url(#colorPlayer1)" 
                  name={player1.nickname}
                />
                <Area 
                  type="monotone" 
                  dataKey="player2" 
                  stroke="#00C49F" 
                  fillOpacity={1} 
                  fill="url(#colorPlayer2)" 
                  name={player2.nickname}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className={styles.cardTitle}>Key Performance Metrics Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#333333" />
                <PolarAngleAxis dataKey="subject" stroke="#888888" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#888888" />
                <Radar 
                  name={player1.nickname} 
                  dataKey="A" 
                  stroke="#FF0000" 
                  fill="#FF0000" 
                  fillOpacity={0.6}
                  onMouseEnter={() => setFocusBar('A')}
                  onMouseLeave={() => setFocusBar(null)}
                />
                <Radar 
                  name={player2.nickname} 
                  dataKey="B" 
                  stroke="#00C49F" 
                  fill="#00C49F" 
                  fillOpacity={0.6}
                  onMouseEnter={() => setFocusBar('B')}
                  onMouseLeave={() => setFocusBar(null)}
                />
                <Legend />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  itemStyle={{ color: '#E5E7EB' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

