import { RevoGrid, type ColumnRegular, type DataType } from "@revolist/react-datagrid";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect } from "react";
import { defineCustomElements } from "@revolist/revogrid/loader";

interface DataTableProps<TData extends DataType> {
  columns: ColumnRegular[];
  data: TData[];
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
}

export function PmbTable<TData extends DataType>({
  columns,
  data,
  pageCount,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
}: DataTableProps<TData>) {
  useEffect(() => {
    defineCustomElements(window);
  }, []);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-card/60 backdrop-blur-xl shadow-2xl shadow-primary/5 p-4">
        <div style={{ height: "550px" }} className="revo-grid-container">
          <RevoGrid
            columns={columns}
            source={data}
            rowSize={64}
            theme="compact"
            canFocus={false}
            range={false}
            resize={true}
            readonly={true}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-5 bg-card/40 rounded-[2rem] border border-primary/5 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-10">
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
              <SelectTrigger className="h-9 w-[75px] bg-background/40 border-primary/10 rounded-xl shadow-inner font-bold text-xs">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent
                side="top"
                className="rounded-2xl border-primary/10 backdrop-blur-xl"
              >
                {[10, 20, 30, 40, 50].map((size) => (
                  <SelectItem
                    key={size}
                    value={`${size}`}
                    className="rounded-lg"
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-center text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
            Page {pageIndex} <span className="mx-1.5 opacity-30">of</span>{" "}
            {pageCount}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="hidden h-10 w-10 p-0 lg:flex border-primary/10 hover:bg-primary hover:text-primary-foreground rounded-2xl transition-all shadow-md group"
            onClick={() => setPageIndex(1)}
            disabled={pageIndex === 1}
          >
            <ChevronsLeft className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="h-10 w-10 p-0 border-primary/10 hover:bg-primary hover:text-primary-foreground rounded-2xl transition-all shadow-md group"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 1}
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          </Button>

          <div className="px-5 py-2 rounded-xl bg-primary shadow-lg shadow-primary/20 text-primary-foreground font-black text-xs">
            {pageIndex}
          </div>

          <Button
            variant="outline"
            className="h-10 w-10 p-0 border-primary/10 hover:bg-primary hover:text-primary-foreground rounded-2xl transition-all shadow-md group"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex === pageCount}
          >
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-10 w-10 p-0 lg:flex border-primary/10 hover:bg-primary hover:text-primary-foreground rounded-2xl transition-all shadow-md group"
            onClick={() => setPageIndex(pageCount)}
            disabled={pageIndex === pageCount}
          >
            <ChevronsRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>

      <style>{`
        .revo-grid-container revogr-grid {
          height: 100%;
          width: 100%;
          border: none;
          background: transparent;
        }
        .revo-grid-container {
          --revo-grid-background-color: transparent;
          --revo-header-background-color: transparent;
          --revo-header-text-color: var(--primary);
          --revo-row-border-color: rgba(var(--primary-rgb), 0.08);
          --revo-cell-border-color: rgba(var(--primary-rgb), 0.04);
          --revo-active-cell-color: var(--primary);
          --revo-row-odd-background-color: transparent;
          --revo-row-even-background-color: rgba(var(--primary-rgb), 0.02);
        }
        revogr-header-view {
          background-color: rgba(var(--primary-rgb), 0.05) !important;
          border-bottom: 2px solid rgba(var(--primary-rgb), 0.15) !important;
        }
        revogr-header-view revogr-header-cell {
          font-weight: 900 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.15em !important;
          font-size: 10px !important;
          color: var(--primary) !important;
          padding: 0 20px !important;
          transition: background-color 0.2s;
        }
        .dark revogr-header-view revogr-header-cell {
          color: #f8fafc !important; /* Slate 50 for high contrast in dark mode */
        }
        revogr-header-view revogr-header-cell:hover {
          background-color: rgba(var(--primary-rgb), 0.1) !important;
        }
        div[slot="content-fixed-left"] {
          border-right: 2px solid rgba(var(--primary-rgb), 0.1) !important;
          box-shadow: 10px 0 20px -10px rgba(0,0,0,0.1) !important;
          background: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(10px);
        }
        .dark div[slot="content-fixed-left"] {
          background: rgba(15, 16, 20, 0.95) !important;
          box-shadow: 15px 0 30px -10px rgba(0,0,0,0.4) !important;
          border-right: 2px solid rgba(var(--primary-rgb), 0.2) !important;
        }
        revogr-viewport-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(var(--primary-rgb), 0.2) transparent;
        }
        .dark revogr-temp-row:hover {
          background-color: rgba(var(--primary-rgb), 0.12) !important;
        }
        revogr-temp-row:hover {
          background-color: rgba(var(--primary-rgb), 0.06) !important;
        }
        revogr-data .rgCell {
          padding: 0 !important;
          line-height: normal !important;
        }
      `}</style>
    </div>
  );
}
