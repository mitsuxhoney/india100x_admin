import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import Layout from './components/Layout'
import BusinessDashboard from './pages/BusinessDashboard/BusinessDashboard'
import SystemDashboard from './pages/SystemDashboard/SystemDashboard'
import Error404 from './pages/Error404/Error404'
import Programs from './pages/Programs/Programs'
import ProgramManagers from './pages/ProgramManagers/ProgramManagers'
import Inventory from './pages/Inventory/Inventory'
import IssuedCards from './pages/IssuedCards/IssuedCards'
import AllCustomers from './pages/AllCustomers/AllCustomers'
import FlaggedCustomers from './pages/FlaggedCustomers/FlaggedCustomers'
import PendingKyc from './pages/PendingKyc/PendingKyc'
import PoolAccounts from './pages/PoolAccounts/PoolAccounts'
import FundingTransactions from './pages/FundingTransactions/FundingTransactions'
import SystemUsers from './pages/SystemUsers/SystemUsers'
import UserActivityLogs from './pages/UserActivityLogs/UserActivityLogs'
import SecuritySettings from './pages/SecuritySettings/SecuritySettings'
import ApiSettings from './pages/ApiSettings/ApiSettings'
import DefaultConfigs from './pages/DefaultConfigs/DefaultConfigs'
import CreateProgram from './pages/CreateProgram/CreateProgram'
import CreateInventory from './pages/CreateInventory/CreateInventory'
function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/business-dashboard" replace />}
          />
          <Route path="/business-dashboard" element={<BusinessDashboard />} />
          <Route path="/system-dashboard" element={<SystemDashboard />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/create-program" element={<CreateProgram />} />
          <Route path="/program-managers" element={<ProgramManagers />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route
            path="/inventory/create-inventory"
            element={<CreateInventory />}
          />
          <Route path="/issued-cards" element={<IssuedCards />} />
          <Route path="/all-customers" element={<AllCustomers />} />
          <Route path="/flagged-customers" element={<FlaggedCustomers />} />
          <Route path="/pending-kyc" element={<PendingKyc />} />
          <Route path="/pool-accounts" element={<PoolAccounts />} />
          <Route
            path="/funding-transactions"
            element={<FundingTransactions />}
          />
          <Route path="/system-users" element={<SystemUsers />} />
          <Route path="/user-activity-logs" element={<UserActivityLogs />} />
          <Route path="/security-settings" element={<SecuritySettings />} />
          <Route path="/api-settings" element={<ApiSettings />} />
          <Route path="/default-configs" element={<DefaultConfigs />} />
        </Route>
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
