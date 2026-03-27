import React, { useEffect, useState } from 'react';
import ReusableDataTable from '../../../components/ui/ReusableTable';
import { getClubIncomeReport } from '../../../api/admin-api';


const ClubIncomeReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noDataMessage, setNoDataMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setNoDataMessage('');
    try {
      const response = await getClubIncomeReport();
      console.log('Club Income Response:', response);

      if (response?.success === false) {
        setData([]);
        setNoDataMessage(response?.message || 'No club income history found');
      } else {
        setData(response?.data || []);
        setNoDataMessage('');
      }
    } catch (err) {
      console.error('Error fetching club income:', err);
      setData([]);
      setNoDataMessage('Failed to load club income data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Table Columns - EXACTLY as per Schema
    const columns = [
      {
        key: 'username',
        label: 'Username',
        sortable: true,
        render: (row) => row.userId?.username || '-',
      },
      {
        key: 'name',
        label: 'Name',
        sortable: true,
        render: (row) => row.userId?.name || '-',
      },
      {
        key: 'clubName',
        label: 'Club Name',
        sortable: true,
        render: (row) => row.clubName || '-',
      },
      {
        key: 'rank',
        label: 'Rank',
        sortable: true,
        render: (row) => row.rank || '-',
      },
      {
        key: 'percent',
        label: 'Percent (%)',
        sortable: true,
        render: (row) => `${row.percent || 0}%`,
      },
      {
        key: 'incomeAmount',
        label: 'Income Amount',
        sortable: true,
        render: (row) => `$${row.incomeAmount?.toLocaleString() || 0}`,
      },
      {
        key: 'totalProfit',
        label: 'Total Profit',
        sortable: true,
        render: (row) => `$${row.totalProfit?.toLocaleString() || 0}`,
      },
      {
        key: 'createdAt',
        label: 'Earned On',
        sortable: true,
        render: (row) => new Date(row.createdAt).toLocaleString(),
      },
    ];

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-white">Club Income Report</h1>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-400 animate-pulse">
            Loading Club Income...
          </div>
        </div>
      )}

      {/* Table + Message */}
      {!loading && (
        <div>
          {/* TABLE - Always Visible */}
          <div className=" rounded-xl shadow-2xl overflow-hidden border border-gray-700">
            <ReusableDataTable
              data={data}
              columns={columns}
              emptyMessage="No club income records"
            />
          </div>

          {/* Message Below Table */}
          {noDataMessage && data.length === 0 && (
            <div className="mt-8 p-6  rounded-xl text-center shadow-lg">
              <p className="text-indigo-300 text-lg font-semibold">
                {noDataMessage}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClubIncomeReport;