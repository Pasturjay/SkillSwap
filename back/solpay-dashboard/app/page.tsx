'use client'

import { useState, useEffect } from 'react'
import { Bell, ChevronDown, CreditCard, Home, Key, LogOut, Settings, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MerchantDashboard() {
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    transactions: 0,
    activeCustomers: 0
  })

  useEffect(() => {
    fetchDashboardData()
    fetchApiKey()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  const fetchApiKey = async () => {
    try {
      const response = await fetch('/api/apikey')
      const data = await response.json()
      setApiKey(data.apiKey)
    } catch (error) {
      console.error('Error fetching API key:', error)
    }
  }

  const generateNewApiKey = async () => {
    try {
      const response = await fetch('/api/apikey', { method: 'POST' })
      const data = await response.json()
      setApiKey(data.apiKey)
    } catch (error) {
      console.error('Error generating new API key:', error)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">SolPay</h1>
        </div>
        <nav className="mt-4">
          <a href="#" className="flex items-center px-4 py-2 text-foreground bg-accent">
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-foreground hover:bg-accent">
            <CreditCard className="mr-3 h-5 w-5" />
            Transactions
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-foreground hover:bg-accent">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-card shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-foreground sm:truncate">Dashboard</h2>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                <span>John Doe</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="api-keys">API Keys</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${dashboardData.totalRevenue.toFixed(2)}</div>
                      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+{dashboardData.transactions}</div>
                      <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                      <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+{dashboardData.activeCustomers}</div>
                      <p className="text-xs text-muted-foreground">+19% from last month</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="api-keys" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>Manage your API keys for integrating SolPay into your applications.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Input 
                        type={showApiKey ? "text" : "password"} 
                        value={apiKey} 
                        readOnly 
                        className="flex-grow"
                      />
                      <Button onClick={() => setShowApiKey(!showApiKey)}>
                        {showApiKey ? 'Hide' : 'Show'}
                      </Button>
                    </div>
                    <Button onClick={generateNewApiKey}>
                      <Key className="mr-2 h-4 w-4" />
                      Generate New API Key
                    </Button>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">Keep your API keys secure. Do not share them publicly.</p>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="documentation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentation</CardTitle>
                    <CardDescription>Learn how to integrate SolPay into your applications.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><a href="#" className="text-primary hover:underline">Getting Started Guide</a></li>
                      <li><a href="#" className="text-primary hover:underline">API Reference</a></li>
                      <li><a href="#" className="text-primary hover:underline">Webhooks</a></li>
                      <li><a href="#" className="text-primary hover:underline">SDKs and Libraries</a></li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
