import { InventoryTable } from '@/components/inventory-table'

const Inventory = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1">
        <div className="aspect-video rounded-xl bg-muted/50">
          <InventoryTable />
        </div>
      </div>
    </div>
  )
}

export default Inventory
