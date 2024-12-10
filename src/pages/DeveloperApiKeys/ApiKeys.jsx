import { Separator } from '@/components/ui/separator'
import { ApiKeysTable } from '@/components/ApiKeysTable'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AuditLogsTable } from '@/components/AuditLogsTable'
const ApiKeys = () => {
  return (
    <div className="space-y-6 select-none overflow-hidden">
      <div>
        <h3 className="text-lg font-medium">API Keys Management</h3>
        <p className="text-sm text-muted-foreground">
          API keys are unique identifiers used to authenticate and authorize
          access to APIs.
        </p>
      </div>

      <Separator />
      <div className="grid grid-cols-1 gap-4">
        <ApiKeysTable />
      </div>
      <div className="grid grid-cols-1">
        <AuditLogsTable />
      </div>
    </div>
  )
}

export default ApiKeys
