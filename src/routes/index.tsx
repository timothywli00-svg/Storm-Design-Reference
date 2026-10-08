import { createFileRoute } from "@tanstack/react-router"
import { SiteGate } from "@/components/site-gate"
import { StormDesk } from "@/components/storm-desk"

export const Route = createFileRoute("/")({
  component: () => (
    <SiteGate>
      <StormDesk />
    </SiteGate>
  ),
})
