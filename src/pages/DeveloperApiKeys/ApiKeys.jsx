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
      <div className="space-y-6 select-none">
        <h3 className="text-lg font-medium">Your Personal Key</h3>
        <div className="grid grid-cols-1 gap-4 items-center w-[23rem] max-sm:w-full">
          <Input value="XFER Default name" disabled={true}></Input>
          <Input value="XFER Default API Key" disabled={true}></Input>
        </div>
        <div>
          <Button variant="outline">Reset Key</Button>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1">
        <AuditLogsTable />
      </div>
    </div>
  )
}

export default ApiKeys
