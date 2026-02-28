import React, { useEffect, useState } from 'react'

import { ServicePackageBuyer } from '../../../api/admin-api'
import ReusableDataTable from '../../../components/ui/ReusableTable'
import PageLoader from '../../../components/ui/PageLoader'

const ServicePackageBuyerHistory = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchpackagehIstory = async () => {
    try {
      setLoading(true)
      const res = await ServicePackageBuyer()
      const processedData = res?.data?.map((item , index) => {
        const user = { ...item.userId , ...item, serialNumber: index + 1 }
        if (user.aiService) {
          user.packageName = item.packageName
          user.packagePrice = user.aiService.packagePrice
          user.activatedDate = user.aiService.activatedDate
          user.expiryDate = user.aiService.expiryDate
          user.packageIsActive = user.aiService.isActive
          user.packageRenewCount = user.aiService.renewCount
        }
        return user
      }) || []
      setData(processedData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchpackagehIstory()
  }, [])

  const columns = [
    { key: 'serialNumber', label: 'Serial Number', sortable: true },
    { key: 'username', label: 'Username', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'referralCode', label: 'Referral Code', sortable: true },
    { key: 'packageName', label: 'Plan Name', sortable: true },
    {
      key: 'packagePrice',
      label: 'Plan Price (USDT)',
      sortable: true,
      render: (val) => (val || 0).toFixed(2)
    },
    {
      key: 'activatedDate',
      label: 'Activated Date',
      sortable: true,
      render: (val) => val ? new Date(val).toLocaleDateString() : '-'
    },
    {
      key: 'expiryDate',
      label: 'Expiry Date',
      sortable: true,
      render: (val) => val ? new Date(val).toLocaleDateString() : '-'
    },
    {
      key: 'totalInvestment',
      label: 'Total Investment (USDT)',
      sortable: true,
      render: (val) => (val || 0).toFixed(2)
    },
    {
      key: 'totalEarnings',
      label: 'Total Earnings (USDT)',
      sortable: true,
      render: (val) => (val || 0).toFixed(2)
    },
    {
      key: 'isVerified',
      label: 'User Status',
      sortable: true,
      render: (val) => (
        <span className={`px-4 py-3 rounded-full text-xl font-bold ${val ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
          {val ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Package Active',
      sortable: true,
      render: (val) => (
        <span className={`px-4 py-2 rounded-full text-xl font-bold ${val ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
          {val ? 'Yes' : 'No'}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (val) => (val ? new Date(val).toLocaleDateString() : '-')
    }
  ]

  if (loading) return <PageLoader />

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Service Package Buyer History</h1>
        <button
          onClick={fetchpackagehIstory}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
        >
          Refresh
        </button>
      </div>
      <ReusableDataTable data={data} columns={columns} />
    </div>
  )
}

export default ServicePackageBuyerHistory