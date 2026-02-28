
import React, { useEffect, useState } from 'react'
import ReusableDataTable from '../../components/ui/ReusableTable'
import { getServicePackageActivationHistory } from '../../api/user-api'

const ServicePackageActivationHistory = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchpackagehIstory = async () => {
        try {
            setLoading(true)
            const res = await getServicePackageActivationHistory()
            if (res?.success) {
                setData(res?.data || []);
            }
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
        { key: "Sr No", label: "Sr", render: (_, row, index) => index + 1 },
        { key: 'packageName', label: 'Plan Name', sortable: true },
        {
            key: 'packagePrice',
            label: 'Plan Price (USDT)',
            sortable: true,
            render: (val) => (val || 0).toFixed(2)
        },

        {
            key: 'totalMatchingIncome',
            label: 'Total Matching Income (USDT)',
            sortable: true,
            render: (val) => (val || 0).toFixed(2)
        },
        {
            key: 'totalDirectIncome',
            label: 'Total Direct Income (USDT)',
            sortable: true,
            render: (val) => (val || 0).toFixed(2)
        },
        {
            key: 'validityMonths',
            label: 'Validity (Months)',
            sortable: true,
            render: (val) => (val || 0)
        },
        {
            key: 'startDate',
            label: 'Activated Date',
            sortable: true,
            render: (val) => val ? new Date(val).toLocaleDateString() : '-'
        },
        {
            key: 'endDate',
            label: 'Expiry Date',
            sortable: true,
            render: (val) => val ? new Date(val).toLocaleDateString() : '-'
        },
    ]

    return (
        <div className="p-6">
            {/* <h1 className="text-2xl font-bold text-white">Service Package Activation History</h1> */}
            <ReusableDataTable data={data} columns={columns} />
        </div>
    )
}

export default ServicePackageActivationHistory