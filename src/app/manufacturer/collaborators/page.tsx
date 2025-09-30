import { CollaboratorsManagement } from "@/src/components/manufacturer/collaborators-management"
import { ManufacturerHeader } from "@/src/components/manufacturer/header"

export default function CollaboratorsPage() {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <ManufacturerHeader />
      <main className="container mx-auto px-4 py-8">
        <CollaboratorsManagement />
      </main>
    </div>
  )
}
