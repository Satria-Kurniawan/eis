import { RouterProvider } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { router } from "./Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PeriodProvider } from "@/contexts/PeriodContext";
import { UnitFilterProvider } from "@/contexts/UnitFilterContext";
import { HubPortalProvider } from "@/contexts/HubPortalContext";

const queryClient = new QueryClient();

export default function AppRouterProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <PeriodProvider>
        <UnitFilterProvider>
          <HubPortalProvider>
            <TooltipProvider>
              <RouterProvider router={router} />
            </TooltipProvider>
          </HubPortalProvider>
        </UnitFilterProvider>
      </PeriodProvider>
    </QueryClientProvider>
  );
}
