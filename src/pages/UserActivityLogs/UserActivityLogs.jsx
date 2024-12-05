import { ActivityLogsTable } from '@/components/user-activity-logs-table'

const UserActivityLogs = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-video bg-muted/50 rounded-lg">
        <ActivityLogsTable />
      </div>
    </div>
  )
}

export default UserActivityLogs
