import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
}

export function EvaluasiTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pageCount,
  });

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="relative overflow-hidden rounded-3xl border border-primary/5 bg-card/40 backdrop-blur-xl shadow-2xl">
        <Table>
          <TableHeader className="bg-muted/30">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-primary/5"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-14 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-6"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group hover:bg-primary/3 border-primary/5 transition-all duration-300"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-5 px-6">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-60 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-3 opacity-30">
                    <div className="size-12 rounded-2xl bg-muted animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                      Tidak Ada Data Evaluasi
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-muted/20 rounded-2xl border border-primary/5">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
              Limit
            </p>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px] bg-background/50 border-primary/10 rounded-lg">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">
            Halaman {pageIndex} / {pageCount}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border-primary/10 hover:bg-primary/10 transition-colors rounded-lg"
            onClick={() => setPageIndex(1)}
            disabled={pageIndex === 1}
          >
            <ChevronsLeft className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border-primary/10 hover:bg-primary/10 transition-colors rounded-lg"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 1}
          >
            <ChevronLeft className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border-primary/10 hover:bg-primary/10 transition-colors rounded-lg"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex === pageCount}
          >
            <ChevronRight className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border-primary/10 hover:bg-primary/10 transition-colors rounded-lg"
            onClick={() => setPageIndex(pageCount)}
            disabled={pageIndex === pageCount}
          >
            <ChevronsRight className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
}
