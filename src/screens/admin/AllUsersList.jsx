import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import ReusableDataTable from "../../components/ui/ReusableTable";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import { AuthenticatedRoutes } from "../../constants/Routes";
import {
  adminLoign,
  blockTradeIncome,
  getUsers,
  userStatusToggle,
} from "../../api/admin-api";
import Swal from "sweetalert2";
import { maskMemberIdFourLatter } from "../../utils/additionalFunc";
import { useNavigate } from "react-router-dom";
import { UserCheck } from "lucide-react";
import { ImBlocked } from "react-icons/im";

const AllUsersList = () => {
  const [loading, setLoading] = useState(false);
  const [UserList, setUserList] = useState([]);
  const [blockTradeLoading, setBlockTradeLoading] = useState(false);

  const navigate = useNavigate();

  const handleBlockTradeIncome = async (row) => {
    try {
      setBlockTradeLoading(true);
      const payload = { userId: row?._id, tradeIncomeBlocked: !row?.tradeIncomeBlocked };
      const response = await blockTradeIncome(payload);
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response?.message || "Trade Income Blocked"
        })
        fetchAllUsers();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to block trade income"
      })
    } finally {
      setBlockTradeLoading(false);
    }
  }

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      console.log(response);
      setUserList(response?.data);
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

  const handleStatusToggle = async (rowData) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: `You want to ${rowData.loginBlocked ? "unblock" : "block"} this user?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, do it!",
      });

      if (!confirm.isConfirmed) return;

      const res = await userStatusToggle({
        userId: rowData._id,
        block: !rowData.loginBlocked,
      });
      console.log(res);

      SwalSuccess.fire({
        icon: "success",
        title: "Status Updated",
        text: res?.message || "User status updated successfully.",
      });

      fetchAllUsers();
    } catch (error) {
      console.error(error);
      SwalError.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.response?.data?.message || "Failed to update status.",
      });
    }
  };

  const handleProfileEdit = async (rowData) => {
    navigate(AuthenticatedRoutes.EIDT_PROFILE_ADMIN, { state: { rowData } });
  };

  const handlerLoginUserProfile = async (rowData) => {
    const payload = { userId: rowData._id };
    const adminRole = localStorage.getItem("role");
    const adminToken = localStorage.getItem("token");
    localStorage.setItem("adminRole", adminRole);
    localStorage.setItem("adminToken", adminToken);
    localStorage.setItem("isImpersonating", "true");

    try {
      const res = await adminLoign(payload);
      if (!res?.success || !res?.token || !res?.data) {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: res?.message || "Invalid server response",
        });
        return;
      }

      const { token, data } = res;
      const username = data?.username || "User";
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.setItem("token", token);
      localStorage.setItem("role", "User");
      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: `You have logged in as ${username}`,
      }).then(() => {
        navigate(AuthenticatedRoutes.USER_DASHBOARD);
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error?.response?.data?.message || error.message,
      });
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
      render: (value) => value?.toFixed(2) || "0.00",
    },
    {
      key: "totalEarnings",
      label: "Total Income",
      sortable: true,
      render: (value) => value?.toFixed(2) || "0.00",
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
      key: "isVerified",
      label: "Status",
      sortable: true,
      render: (value, row) => (
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
      render: (value) => new Date(value).toUTCString(),
    },
    {
      key: "loginBlocked",
      label: "Block/Unblock",
      sortable: false,
      render: (value, row) => (
        <Button
          label={value ? "Unblock" : "Block"}
          icon={value ? "pi pi-lock-open" : "pi pi-lock"}
          tooltip={value ? "Click to unblock this user" : "Click to block this user"}
          tooltipOptions={{ position: "top" }}
          className={`p-button-sm p-button-rounded ${value ? "p-button-success" : "p-button-danger"
            }`}
          style={{
            padding: "0.5rem 1.2rem",
            fontWeight: "600",
            fontSize: "14px",
            borderRadius: "999px",
            backgroundColor: value ? "#28a745" : "#dc3545",
            borderColor: value ? "#28a745" : "#dc3545",
            color: "#fff",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease-in-out",
            minWidth: "100px",
          }}
          onClick={() => handleStatusToggle(row)}
        />
      ),
    },
    {
      key: "editProfile",
      label: "Edit Profile",
      sortable: false,
      render: (value, row) => (
        <Button
          label="Edit Profile"
          icon="pi pi-user-edit"
          tooltip="Click to edit this user's profile"
          tooltipOptions={{ position: "top" }}
          className="p-button-sm p-button-rounded p-button-info"
          style={{
            padding: "0.5rem 1.2rem",
            fontWeight: "600",
            fontSize: "14px",
            borderRadius: "999px",
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            color: "#fff",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease-in-out",
            minWidth: "130px",
          }}
          onClick={() => handleProfileEdit(row)}
        />
      ),
    },
    {
      key: "loginUserProfile",
      label: "Enter User Profile",
      sortable: false,
      render: (value, row) => (
        <Button
          onClick={() => handlerLoginUserProfile(row)}
          tooltip="Login as this user"
          tooltipOptions={{ position: "top" }}
          className="p-button-sm p-button-rounded"
          style={{
            padding: "0.55rem 1.3rem",
            fontWeight: "600",
            fontSize: "14px",
            borderRadius: "999px",

            // 🔥 NEW COLOR THEME
            background: "linear-gradient(135deg, #16a34a, #22c55e)", // green gradient
            border: "none",
            color: "#ffffff",

            display: "flex",
            alignItems: "center",
            gap: "8px",

            boxShadow: "0px 6px 14px rgba(34,197,94,0.35)",
            transition: "all 0.25s ease-in-out",
            minWidth: "150px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0px 10px 20px rgba(34,197,94,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0px 6px 14px rgba(34,197,94,0.35)";
          }}
        >
          <UserCheck size={16} strokeWidth={2.2} />
          <span>Login as User</span>
        </Button>
      ),
    },
    {
      key: "blockTradeIncome",
      label: "Block Trade Income",
      sortable: false,
      render: (value, row) => (
        <Button
          loading={blockTradeLoading}
          disabled={blockTradeLoading}
          onClick={() => handleBlockTradeIncome(row)}
          tooltip={
            row?.tradeIncomeBlocked
              ? "Click to unblock trade income"
              : "Click to block trade income"
          }
          tooltipOptions={{ position: "top" }}
          className="p-button-sm p-button-rounded"
          style={{
            padding: "0.55rem 1.3rem",
            fontWeight: "600",
            fontSize: "14px",
            borderRadius: "999px",
            background: row?.tradeIncomeBlocked
              ? "linear-gradient(135deg, #dc3545, #f87171)" // 🔴 red
              : "linear-gradient(135deg,#0891b2, #0891b2)", // 🔵 blue
            border: "none",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: row?.tradeIncomeBlocked
              ? "0px 6px 14px rgba(220,53,69,0.35)"
              : "0px 6px 14px rgba(8,145,178,0.35)",
            transition: "all 0.25s ease-in-out",
            minWidth: "170px",
          }}
        >
          <ImBlocked size={16} />
          <span>
            {row?.tradeIncomeBlocked
              ? "Unblock Trade Income"
              : "Block Trade Income"}
          </span>
        </Button>
      )
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

export default AllUsersList;