import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {  getTotalIncomeInfo, getUsers } from "../../api/admin-api";
import { maskMemberIdFourLatter } from "../../utils/additionalFunc";

const IncomeCard = ({ title, value, iconSrc, gradient }) => (
  <div className="dark-income-card" style={{ background: gradient }}>
    <div className="card-content">
      <div className="card-icon">
        <img src={iconSrc} alt={title} />
      </div>
      <div className="card-details">
        <span className="card-title">{title}</span>
        <h3 className="card-value">{value}</h3>
      </div>
    </div>
    <div className="card-glow"></div>
  </div>
);

const StatsCard = ({ title, value, icon, color }) => (
  <div className="dark-stats-card">
    <div className="stats-icon" style={{ background: color }}>
      {icon}
    </div>
    <div className="stats-info">
      <p className="stats-label">{title}</p>
      <h4 className="stats-value">{value}</h4>
    </div>
    <div className="stats-glow" style={{ background: color }}></div>
  </div>
);

const AdminDashboard = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo?.data);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);

  const getIncomeReport = async () => {
    setLoading(true);
    try {
      const response = await getTotalIncomeInfo();
      setData(response?.data || {});
    } catch (error) {
      console.error("Error fetching income report:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await getUsers();
      setTotalUsers(response?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getIncomeReport();
    fetchAllUsers();
  }, []);

  const formatValue = (value, isMoneyValue = true) => {
    if (!value && value !== 0) return isMoneyValue ? "$0.00" : "0";
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return isMoneyValue ? "$0.00" : "0";
    return isMoneyValue ? `$${numValue.toFixed(2)}` : numValue.toString();
  };

  const incomeCardData = [
    {
      title: "Total Users",
      value: formatValue(data?.totalUsers, false),
      iconSrc: "https://img.icons8.com/3d-fluency/94/guest-male--v1.png",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Today Investment",
      value: formatValue(data?.todayInvestment),
      iconSrc: "https://img.icons8.com/3d-fluency/94/money-bag-euro.png",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      title: "Total Investment",
      value: formatValue(data?.totalInvestment),
      iconSrc: "https://img.icons8.com/3d-fluency/94/money-bag-euro.png",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      title: "Today Withdrawal",
      value: formatValue(data?.todaySuccessWithdrawal),
      iconSrc: "https://img.icons8.com/3d-fluency/94/atm.png",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      title: "Total Withdrawal",
      value: formatValue(data?.totalSuccessWithdrawal),
      iconSrc: "https://img.icons8.com/3d-fluency/94/atm.png",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      title: "Today Direct Referral Income",
      value: formatValue(data?.todayDirectReferral),
      iconSrc: "https://img.icons8.com/3d-fluency/94/conference-call--v1.png",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    },
    {
      title: "Total Direct Referral Income",
      value: formatValue(data?.totalDirectReferral),
      iconSrc: "https://img.icons8.com/3d-fluency/94/conference-call--v1.png",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Today Trade Level Income",
      value: formatValue(data?.todayLevelIncome),
      iconSrc: "https://img.icons8.com/3d-fluency/94/total-sales.png",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      title: "Total Trade Level Income",
      value: formatValue(data?.totalLevelIncome),
      iconSrc: "https://img.icons8.com/3d-fluency/94/total-sales.png",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      title: "Today Trade Income",
      value: formatValue(data?.todayRoi),
      iconSrc: "https://img.icons8.com/3d-fluency/94/split-transaction.png",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      title: "Total Trade Income",
      value: formatValue(data?.totalRoi),
      iconSrc: "https://img.icons8.com/3d-fluency/94/banknotes-and-coins.png",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      title: "Today Service Level Income",
      value: formatValue(data?.todayServiceLevelIncome),
      iconSrc: "https://img.icons8.com/3d-fluency/94/banknotes-and-coins.png",
      gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    },
    {
      title: "Total Service Level Income",
      value: formatValue(data?.totalServiceLevelIncome),
      iconSrc: "https://img.icons8.com/3d-fluency/94/banknotes-and-coins.png",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Today Fast Track Income",
      value: formatValue(data?.todayFastTrackIncome),
      iconSrc: "https://img.icons8.com/3d-fluency/94/banknotes-and-coins.png",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      title: "Total Fast Track Income",
      value: formatValue(data?.totalFastTrackIncome),
      iconSrc: "https://img.icons8.com/3d-fluency/94/banknotes-and-coins.png",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
  ];

  const serialNumberTemplate = (rowData, { rowIndex }) => rowIndex + 1;

  return (
    <>
      {loading && <PageLoader />}

      <div className="dark-admin-dashboard">
        <div className="quick-stats-section">
          <StatsCard
            title="Total Users"
            value={formatValue(data?.totalUsers, false)}
            color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            icon="👥"
          />
          <StatsCard
            title="Total Investment"
            value={formatValue(data?.totalInvestment)}
            color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            icon="💰"
          />
          <StatsCard
            title="Total Withdrawal"
            value={formatValue(data?.totalSuccessWithdrawal)}
            color="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
            icon="🏦"
          />
          <StatsCard
            title="Total Pending Withdrawal"
            value={formatValue(data?.totalPendingWithdrawal)} 
            color="linear-gradient(135deg, #43e57b 0%, #38f7d7 100%)"
            icon="💸"
          />
          <StatsCard
            title="Total Earnings"
            value={formatValue((data?.totalDirectReferral || 0) + (data?.totalLevelIncome || 0) + (data?.totalRoi || 0))}
            color="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
            icon="📈"
          />
          {/* <StatsCard
            title="Total Earnings Generated"
            value={formatValue((data?.totalDirectReferral || 0) + (data?.totalLevelIncome || 0) + (data?.totalRoi || 0))}
            color="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
            icon="📈"
          />
          <StatsCard
            title="Total Earnings Paid"
            value={formatValue((data?.totalDirectReferral || 0) + (data?.totalLevelIncome || 0) + (data?.totalRoi || 0))}
            color="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
            icon="📈"
          /> */}
        </div>

        {/* Income Cards Grid */}
        <div className="income-section">
          <h2 className="section-title">
            <span className="title-icon">💎</span> Income Overview
          </h2>
          <div className="income-grid">
            {incomeCardData?.map((income, index) => (
              <IncomeCard
                key={index}
                title={income.title}
                value={income.value}
                iconSrc={income.iconSrc}
                gradient={income.gradient}
              />
            ))}
          </div>
        </div>

        {/* Users Table Section */}
        <div className="border !border-gray-700 p-7  rounded-xl">
          <div className="table-header">
            <h2 className="section-title">
              <span className="title-icon">👤</span> All Users
            </h2>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search users..."
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="dark-search-input"
              />
            </div>
          </div>

          <div className="dark-datatable">
            <DataTable
              value={totalUsers}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              filterDisplay="row"
              globalFilter={globalFilter}
              emptyMessage="No users found"
            >
              <Column
                style={{ width: "80px" }}
                body={serialNumberTemplate}
                header="S.No"
                sortable
              />
              <Column
                field="username"
                header="Username"
                filter
                sortable
                filterPlaceholder="Search by name"
              />
              <Column
                field="referralCode"
                header="Referral Code"
                body={(rowData) => maskMemberIdFourLatter(rowData?.referralCode)}
                filter
                sortable
                filterPlaceholder="Search by referral code"
              />
              <Column
                field="totalEarnings"
                header="Total Earnings"
                body={(rowData) => (
                  <span className="earnings-badge total">
                    {rowData.totalEarnings?.toFixed(2)} USDT
                  </span>
                )}
                filter
                sortable
              />
              <Column
                field="currentEarnings"
                header="Current Earnings"
                body={(rowData) => (
                  <span className="earnings-badge current">
                    {rowData.currentEarnings?.toFixed(2)} USDT
                  </span>
                )}
                filter
                sortable
              />
              <Column
                field="totalInvestment"
                header="Investment"
                body={(rowData) => (
                  <span className="earnings-badge investment">
                    {rowData.totalInvestment?.toFixed(2)} USDT
                  </span>
                )}
                filter
                sortable
              />
              <Column
                header="Level Income"
                body={(rowData) => (
                  <span className="earnings-badge level">
                    {rowData.levelIncome?.toFixed(2)} USDT
                  </span>
                )}
                filter
                sortable
              />
              <Column
                header="Direct Referral Income"
                body={(rowData) => (
                  <span className="earnings-badge referral">
                    {rowData.directReferalAmount?.toFixed(2)} USDT
                  </span>
                )}
                filter
                sortable
              />
              <Column
                body={(rowData) => (
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "999px",
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: "13px",
                      backgroundColor: rowData?.status ? "#28a745" : "#dc3545",
                      display: "inline-block",
                      minWidth: "80px",
                      textAlign: "center",
                    }}
                  >
                    {rowData?.isVerified ? "Active" : "Inactive"}
                    {console.log(rowData.isVerified, "vikas")}
                  </span>
                )}
                header="Status"
                // filter
                sortable
              />
              <Column
                field="createdAt"
                header="Join Date"
                body={(rowData) => new Date(rowData.createdAt).toLocaleDateString()}
                filter
                sortable
              />
            </DataTable>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dark-admin-dashboard {
          padding: 25px;
          
          min-height: 100vh;
        }

        .dark-dashboard-header {
          background: linear-gradient(135deg, #1a1f3a 0%, #0f1729 100%);
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 30px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(102, 126, 234, 0.2);
          position: relative;
          overflow: hidden;
        }

        .header-decoration {
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
          border-radius: 50%;
        }

        .header-content {
          position: relative;
          z-index: 1;
        }

        .dashboard-title {
          font-size: 36px;
          font-weight: 800;
          margin: 0 0 10px 0;
        }

        .title-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dashboard-subtitle {
          font-size: 16px;
          color: #a0aec0;
          margin: 0;
        }

        .quick-stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .dark-stats-card {
          background: #151b33;
          padding: 25px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .dark-stats-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
          border-color: rgba(102, 126, 234, 0.3);
        }

        .stats-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          opacity: 0.6;
        }

        .stats-icon {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .stats-info {
          flex: 1;
        }

        .stats-label {
          font-size: 13px;
          color: #718096;
          margin: 0 0 8px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stats-value {
          font-size: 26px;
          font-weight: 700;
          margin: 0;
          color: #fff;
        }

        .income-section {
          margin-bottom: 30px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 25px;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .title-icon {
          font-size: 28px;
        }

        .income-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .dark-income-card {
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .dark-income-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .dark-income-card:hover .card-glow {
          opacity: 1;
        }

        .card-content {
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
          z-index: 1;
        }

        .card-icon img {
          width: 55px;
          height: 55px;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
        }

        .card-details {
          flex: 1;
          color: white;
        }

        .card-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          opacity: 0.95;
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .card-value {
          font-size: 30px;
          font-weight: 800;
          margin: 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .dark-table-section {
          background: #151b33;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .search-box {
          flex: 1;
          max-width: 400px;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
        }

        .dark-search-input {
          width: 100%;
          padding: 12px 20px 12px 45px;
          background: transparent;
          border: 2px solid rgba(102, 126, 234, 0.2);
          border-radius: 12px;
          font-size: 14px;
          color: #fff;
          transition: all 0.3s ease;
        }

        .dark-search-input::placeholder {
          color: #718096;
        }

        .dark-search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .dark-datatable {
          border-radius: 12px;
          overflow: hidden;
        }

        .earnings-badge {
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          display: inline-block;
        }

        .earnings-badge.total {
          background: rgba(25, 118, 210, 0.15);
          color: #4facfe;
          border: 1px solid rgba(79, 172, 254, 0.3);
        }

        .earnings-badge.current {
          background: rgba(56, 142, 60, 0.15);
          color: #43e97b;
          border: 1px solid rgba(67, 233, 123, 0.3);
        }

        .earnings-badge.investment {
          background: rgba(245, 124, 0, 0.15);
          color: #fa709a;
          border: 1px solid rgba(250, 112, 154, 0.3);
        }

        /* PrimeReact Dark Theme Overrides */
        .dark-datatable :global(.p-datatable) {
          background: transparent;
          color: #fff;
        }

        .dark-datatable :global(.p-datatable-header) {
          background: #0a0e27;
          border-color: rgba(255, 255, 255, 0.05);
        }

        .dark-datatable :global(.p-datatable-thead > tr > th) {
          background: #0a0e27;
          color: #a0aec0;
          border-color: rgba(255, 255, 255, 0.05);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.5px;
        }

        .dark-datatable :global(.p-datatable-tbody > tr) {
          background: transparent;
          color: #fff;
          transition: all 0.2s ease;
        }

        .dark-datatable :global(.p-datatable-tbody > tr:hover) {
          background: rgba(102, 126, 234, 0.1);
        }

        .dark-datatable :global(.p-datatable-tbody > tr > td) {
          border-color: rgba(255, 255, 255, 0.05);
        }

        .dark-datatable :global(.p-paginator) {
          background: #0a0e27;
          border-color: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .dark-datatable :global(.p-paginator .p-paginator-pages .p-paginator-page) {
          color: #a0aec0;
        }

        .dark-datatable :global(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
          background: #667eea;
          border-color: #667eea;
          color: #fff;
        }

        .dark-datatable :global(.p-inputtext) {
          background: #0a0e27;
          border-color: rgba(102, 126, 234, 0.2);
          color: #fff;
        }

        .dark-datatable :global(.p-inputtext:focus) {
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.2);
        }

        @media (max-width: 768px) {
          .dark-admin-dashboard {
            padding: 15px;
          }

          .dark-dashboard-header {
            padding: 25px;
          }

          .dashboard-title {
            font-size: 28px;
          }

          .income-grid {
            grid-template-columns: 1fr;
          }

          .quick-stats-section {
            grid-template-columns: 1fr;
          }

          .table-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .search-box {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default AdminDashboard;