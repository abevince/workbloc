import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import NewWorklogItemForm from '../components/NewWorklogItemForm'
import WorklogItemList from '../components/WorklogItemList'

export interface TWorklogItems {
  timeFrom: string
  timeTo: string
  workDone: string
}

const DashboardScreen = () => {
  const [worklogItems, setWorklogItems] = useState<TWorklogItems[]>([])
  return (
    <AppLayout pageTitle="Today">
      <div className="lg:flex">
        <NewWorklogItemForm setWorklogItems={setWorklogItems} />
        <WorklogItemList data={worklogItems} />
      </div>
    </AppLayout>
  )
}
export default DashboardScreen
