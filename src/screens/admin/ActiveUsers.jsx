import { useEffect, useState } from "react";
import ReusableDataTable from "../../components/ui/ReusableTable";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError } from "../../utils/custom-alert";
import { getUsers } from "../../api/admin-api";
import { maskMemberIdFourLatter } from "../../utils/additionalFunc";

const ActiveUsers = () => {
  const [loading, setLoading] = useState(false);
  const [UserList, setUserList] = useState([]);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      const onlyActiveUsers = response?.data?.filter((user) => user?.status === true);
      console.log(onlyActiveUsers);
      setUserList(onlyActiveUsers);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error fetching users",
        text: error?.response?.data?.message || "Failed to fetch user list",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const columns = [
    {
      key: "serialNumber",
      label: "S.No",
      sortable: false,
      render: (value, row, index) => index + 1,
    },
    {
      key: "username",
      label: "Username",
      sortable: true,
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "referralCode",
      label: "Referral Code",
      sortable: true,
      render: (value) => maskMemberIdFourLatter(value),
    },
    {
      key: "totalInvestment",
      label: "Total Investment",
      sortable: true,
      render: (value) => `${value?.toFixed(2) || "0.00"} USDT`,
    },
    {
      key: "totalEarnings",
      label: "Total Earnings",
      sortable: true,
      render: (value) => `${value?.toFixed(2) || "0.00"} USDT`,
    },
    {
      key: "currentEarnings",
      label: "Current Earnings",
      sortable: true,
      render: (value) => `${value?.toFixed(2) || "0.00"} USDT`,
    },
    {
      key: "levelIncome",
      label: "Level Income",
      sortable: true,
      render: (value) => `${value?.toFixed(2) || "0.00"} USDT`,
    },
    {
      key: "directReferalAmount",
      label: "Direct Referral Income",
      sortable: true,
      render: (value) => `${value?.toFixed(2) || "0.00"} USDT`,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => (
        <span
          style={{
            padding: "6px 12px",
            borderRadius: "999px",
            color: "#fff",
            fontWeight: "600",
            fontSize: "13px",
            backgroundColor: value ? "#28a745" : "#dc3545",
            display: "inline-block",
            minWidth: "80px",
            textAlign: "center",
          }}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Join Date",
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport martop">
        <div className="martop">
          <ReusableDataTable data={UserList} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default ActiveUsers;