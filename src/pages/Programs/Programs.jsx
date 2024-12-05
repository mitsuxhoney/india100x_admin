import { ProgramChart } from "../../components/program-chart"
import { ProgramTableDemo } from "../../components/program-table"

const Programs = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
         <ProgramChart className="aspect-video rounded-xl bg-muted/50"/>
         <ProgramChart className="aspect-video rounded-xl bg-muted/50"/>
         <ProgramChart className="aspect-video rounded-xl bg-muted/50"/>
      </div>
      <ProgramTableDemo className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  )
}

export default Programs
