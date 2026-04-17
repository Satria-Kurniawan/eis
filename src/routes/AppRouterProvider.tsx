import { RouterProvider } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { router } from "./Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PeriodProvider } from "@/contexts/PeriodContext";

const queryClient = new QueryClient();

export default function AppRouterProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <PeriodProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </PeriodProvider>
    </QueryClientProvider>
  );
}
