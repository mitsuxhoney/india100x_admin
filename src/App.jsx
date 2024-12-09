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
import CreateProgram from './pages/CreateProgram/CreateProgram'
import CreateInventory from './pages/CreateInventory/CreateInventory'
import Profile from '@/pages/AccountProfile/Profile'
import Security from '@/pages/AccountSecurity/Security'
import Appearance from '@/pages/AccountAppearance/Appearance'
import Notifications from '@/pages/AccountNotifications/Notifications'

import ApiKeys from '@/pages/DeveloperApiKeys/ApiKeys'
import Webhooks from '@/pages/DeveloperWebhooks/Webhooks'
import IpWhitelisting from '@/pages/DeveloperIpWhitelisting/IpWhitelisting'

import Users from '@/pages/TeamUsers/Users'

import Logs from '@/pages/TeamLogs/Logs'
import Login from '@/pages/Login/Login'

import UserProfileLayout from './components/UserProfileLayout'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
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
          <Route path="/pending-for-kyc" element={<PendingKyc />} />
          <Route path="/pool-accounts" element={<PoolAccounts />} />
          <Route
            path="/funding-transactions"
            element={<FundingTransactions />}
          />
          <Route path="/system-users" element={<SystemUsers />} />
          <Route path="/user-activity-logs" element={<UserActivityLogs />} />
          <Route element={<UserProfileLayout />}>
            <Route
              path="/account"
              element={<Navigate to="/account/profile" />}
            />
            <Route path="/account/profile" element={<Profile />} />
            <Route path="/account/security" element={<Security />} />
            <Route path="/account/appearance" element={<Appearance />} />
            <Route path="/account/notifications" element={<Notifications />} />
            <Route
              path="/developer"
              element={<Navigate to="/developer/api-keys" />}
            />
            <Route path="/developer/api-keys" element={<ApiKeys />} />
            <Route path="/developer/webhooks" element={<Webhooks />} />
            <Route
              path="/developer/ip-whitelisting"
              element={<IpWhitelisting />}
            />
            <Route path="/team" element={<Navigate to="/team/users" />} />
            <Route path="/team/users" element={<Users />} />

            <Route path="/team/logs" element={<Logs />} />
          </Route>
        </Route>
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
