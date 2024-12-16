import { Layout } from "@/components/layout"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Stats() {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Table className="border-collapse w-full">
          <TableHeader>
            <TableRow className="bg-[#FF0000] text-white">
              <TableHead className="w-12 text-white">#</TableHead>
              <TableHead className="text-white">NICKNAME</TableHead>
              <TableHead className="text-white">ROLE</TableHead>
              <TableHead className="text-white">WIN</TableHead>
              <TableHead className="text-white">EXTRA</TableHead>
              <TableHead className="text-white">FOUL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i} className="border-b border-gray-800">
                <TableCell className="text-white">{i + 1}</TableCell>
                <TableCell>
                  <span className="bg-[#FF0000] text-white px-2 py-1 rounded">PLAYER_{i + 1}</span>
                </TableCell>
                <TableCell>
                  <span className="bg-[#FF0000] text-white px-2 py-1 rounded">CIVILIAN</span>
                </TableCell>
                <TableCell className="text-white">0</TableCell>
                <TableCell className="text-white">0.0</TableCell>
                <TableCell className="text-white">0</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

