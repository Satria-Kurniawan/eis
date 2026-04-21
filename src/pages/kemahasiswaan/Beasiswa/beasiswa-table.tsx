import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  SearchX
} from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
}

export function BeasiswaTable<TData, TValue>({
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-card/40 backdrop-blur-2xl shadow-2xl shadow-primary/5">
        <Table>
          <TableHeader className="bg-primary/5">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-primary/10"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-16 text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 px-8"
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
                  className="group hover:bg-primary/5 border-primary/5 transition-colors duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-5 px-8 border-b border-primary/5">
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
                  className="h-64 text-center"
                >
                  <div className="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-[2rem] border border-dashed border-primary/10 m-6">
                    <SearchX className="size-10 text-muted-foreground/30 mb-4" />
                    <span className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">
                      Data Beasiswa Tidak Ditemukan
                    </span>
                    <p className="text-xs text-muted-foreground/40 mt-1 italic font-medium uppercase tracking-[0.2em]">
                      Periksa filter atau navigasi ke periode yang berbeda untuk data lebih lengkap.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-10 py-6 bg-card/40 rounded-[2.5rem] border border-primary/10 backdrop-blur-xl shadow-lg shadow-primary/5">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
              Rows
            </p>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-10 w-[85px] bg-background/40 border-primary/10 rounded-2xl shadow-inner font-black text-xs uppercase tracking-tighter pr-3">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top" className="rounded-[1.5rem] dark:border-primary/20 backdrop-blur-2xl">
                {[10, 20, 30, 40, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`} className="rounded-xl font-bold">
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-center text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-6 py-3 rounded-full border border-primary/10 shadow-sm">
            Halaman {pageIndex} <span className="mx-2 opacity-30 italic">of</span> {pageCount}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="hidden h-11 w-11 p-0 lg:flex border-primary/10 hover:bg-primary hover:text-primary-foreground rounded-2xl transition-all shadow-md active:scale-95 group"
            onClick={() => setPageIndex(1)}
            disabled={pageIndex === 1}
          >
            <ChevronsLeft className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="h-11 w-11 p-0 border-primary/10 hover:bg-primary hover:text-primary-foreground rounded-2xl transition-all shadow-md active:scale-95 group"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 1}
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          </Button>
          
          <div className="px-6 py-2.5 rounded-2xl bg-primary shadow-xl shadow-primary/20 text-primary-foreground font-black text-sm tabular-nums">
            {pageIndex}
          </div>

          <Button
            variant="outline"
            className="h-11 w-11 p-0 border-primary/10 hover:bg-primary hover:text-primary-foreground rounded-2xl transition-all shadow-md active:scale-95 group"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex === pageCount}
          >
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-11 w-11 p-0 lg:flex border-primary/10 hover:bg-primary hover:text-primary-foreground rounded-2xl transition-all shadow-md active:scale-95 group"
            onClick={() => setPageIndex(pageCount)}
            disabled={pageIndex === pageCount}
          >
            <ChevronsRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
