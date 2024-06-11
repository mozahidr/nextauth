import React from 'react'
import { auth } from '@/auth'

const DashboardPage = async () => {
    const session = await auth();
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{session?.user.email}</h2>
    </div>
  )
}

export default DashboardPage
