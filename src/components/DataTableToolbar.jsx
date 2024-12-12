import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { tags, priorities } from './programData'

import DataTableFacetedFilter from '@/components/DataTableFacetedFilter'
import DataTableViewOptions from '@/components/DataTableViewOptions'

const DataTableToolbar = ({ table }) => {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by Name..."
          value={table.getColumn('name')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
        {/* {filtersArray.map((filter) => {
          return (
            <DataTableFacetedFilter
              key={filter.label}
              column={table.getColumn(filter.value)}
              title={filter.label}
              options={filter}
            />
          )
        })} */}
        {/* {table.getColumn('tags') && (
          <DataTableFacetedFilter
            column={table.getColumn('tags')}
            title="Tags"
            options={tags}
          />
        )} */}
        {/* {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={status}
          />
        )} */}
        {/* {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

export default DataTableToolbar
