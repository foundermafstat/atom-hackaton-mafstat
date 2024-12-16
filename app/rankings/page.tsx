import { Layout } from "@/components/layout"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Rankings() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-white mb-6">MAFSTAT BCN, 5 DEC</h2>
        <Table className="border-collapse w-full">
          <TableHeader>
            <TableRow className="bg-[#FF0000] text-white">
              <TableHead className="w-12 text-white">#</TableHead>
              <TableHead className="text-white">NICKNAME</TableHead>
              <TableHead className="text-white">GAMES-WINS ALL</TableHead>
              <TableHead className="text-white">EXTRA SCORE</TableHead>
              <TableHead className="text-white">TOTAL</TableHead>
              <TableHead className="text-white">G-W CIV</TableHead>
              <TableHead className="text-white">EXTRA CIV</TableHead>
              <TableHead className="text-white">FOULS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i} className="border-b border-gray-800">
                <TableCell className="text-white">{i + 1}</TableCell>
                <TableCell>
                  <span className="bg-[#FF0000] text-white px-2 py-1 rounded">PLAYER_{i + 1}</span>
                </TableCell>
                <TableCell className="text-white">4-2</TableCell>
                <TableCell className="text-white">0.50</TableCell>
                <TableCell className="text-white">
                  <span className="bg-[#FF0000] text-white px-2 py-1 rounded">2.50</span>
                </TableCell>
                <TableCell className="text-white">2-0</TableCell>
                <TableCell className="text-white">0.20</TableCell>
                <TableCell className="text-white">1</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

