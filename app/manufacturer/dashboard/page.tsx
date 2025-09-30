import { ManufacturerDashboard } from "@/components/manufacturer/dashboard"
import { ManufacturerHeader } from "@/components/manufacturer/header"

export default function ManufacturerDashboardPage() {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <ManufacturerHeader />
      <main className="container mx-auto px-4 py-8">
        <ManufacturerDashboard />
      </main>
    </div>
  )
}
