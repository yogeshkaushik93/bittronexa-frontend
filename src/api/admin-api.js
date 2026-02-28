import api from "../utils/axiosInstance";
const apiURL = "/admin";
const token = localStorage.getItem("token");

export async function getPendingComplainHistory() {
  const response = await api.get(`${apiURL}/support-in-process`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function approveComplainRequest(id, responsePayload) {
  const res = await api.post(
    `${apiURL}/support/status/approve/${id}`,
    { status: "accept", ...responsePayload },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return res;
}

export async function rejectComplainRequest(id, responsePayload) {
  const response = await api.post(
    `${apiURL}/support/status/reject/${id}`,
    { status: "reject", ...responsePayload },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}

export async function getAllUserList() {
  const response = await api.get(`${apiURL}/all-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

// export async function userStatusToggle(id) {
//   const response = await api.get(`${apiURL}/user-block/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     withCredentials: true,
//   });
//   return response;
// }
export async function deleteUserAdminEnd(id) {
  const response = await api.get(`${apiURL}/delete-user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response;
}
export async function getDirectReferralIncome() {
  const response = await api.get(`${apiURL}/directreferralincome-reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getSelfIncomeHistory() {
  const response = await api.get(`${apiURL}/selfincome-reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getMatchingIncomeHistory() {
  const response = await api.get(`${apiURL}/matchingincome-reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getLevelIncomeHistory() {
  const response = await api.get(`${apiURL}/getAllLevelIncome-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getAllPlanPurchaseList() {
  const response = await api.get(`${apiURL}/getAllInvestedUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function createOrUpdateBanner(payload) {
  const response = await api.post(`${apiURL}/upload-banner`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getBannerList() {
  const response = await api.get(`${apiURL}/get-banner`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function adminWithdrawalUpdate(payload) {
  const response = await api.post(`${apiURL}/withdrawal-update`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function loginWithEmailAdminApi(payload) {
  const response = await api.post(`${apiURL}/gateway/secure/9f3a7c-admin/auth`, payload, {
    withCredentials: true,
  });
  return response?.data;
}

export async function getAdminInfo() {
  const response = await api.get(`${apiURL}/getProfile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getTotalIncomeInfo() {
  const response = await api.get(`${apiURL}/getAllIncomes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getUsers() {
  const response = await api.get(`${apiURL}/getAllUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getROiHistory() {
  const response = await api.get(`${apiURL}/get-roi-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAllBanners() {
  const response = await api.get(`${apiURL}/get-banners`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteBanner(id) {
  const response = await api.get(`${apiURL}/delete-banner/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function RefferralIncomeAPi() {
  const response = await api.get(`${apiURL}/getAllReferalBonus-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function userStatusToggle(payload) {
  const response = await api.post(`${apiURL}/toggle-user-block`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function updateTransactionLimit(payload) {
  const response = await api.post(`${apiURL}/change-per-day-limit-count`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function updateMinMaxLimit(payload) {
  const response = await api.post(`${apiURL}/change-min-max-limit`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function updateMinPackageAmount(payload) {
  const response = await api.post(`${apiURL}/change-package-amount`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function userBlockToggle(payload) {
  const response = await api.post(`${apiURL}/withdrawal-block`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function setUserTransactionLimit(payload) {
  const response = await api.post(`${apiURL}/set-withdrawal-limit`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getMinMaxLimit() {
  const response = await api.get(`${apiURL}/getAllReferalBonus-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function approveWithdrawal(payload) {
  console.log(payload);
  const token = localStorage.getItem("token");
  const response = await api.post(
    `${apiURL}/withdrawal-approve`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
}

export async function rejectWithdrawal(payload) {
  const token = localStorage.getItem("token");
  const response = await api.post(
    `${apiURL}/withdrawal-reject`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
}
export async function getUserByName(payload) {
  const token = localStorage.getItem("token");
  const response = await api.post(
    `${apiURL}/get-username`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
}
export async function topupUserAccount(payload) {
  const token = localStorage.getItem("token");
  const response = await api.post(
    `${apiURL}/activate-service`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
}


export async function ServicePackageBuyer() {
  const response = await api.get(`${apiURL}/get-services-buyer`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  console.log(response)
  return response?.data;
}
export async function getMatchingIncome() {
  const response = await api.get(`${apiURL}/get-matching-income`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  console.log(response)
  return response?.data;
}
export async function getRankRewardIncome() {
  const response = await api.get(`${apiURL}/get-matching-rank-reward-income`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  console.log(response)
  return response?.data;
}
export async function getClubIncomeReport() {
  const response = await api.get(`${apiURL}/get-club-income-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  console.log(response)
  return response?.data;
}
export async function getP2Phistory() {
  const response = await api.get(`${apiURL}/get-p2p-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  console.log(response)
  return response?.data;
}
export async function getIbIncomeHistory() {
  const response = await api.get(`${apiURL}/get-ib-hisotry`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  console.log(response)
  return response?.data;
}
export async function getFastTrackIncomeHistory() {
  const response = await api.get(`${apiURL}/get-fast-tract-income`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  console.log(response)
  return response?.data;
}



export async function editUserBotxAdmin(payload) {
  const token = localStorage.getItem("token");
  const response = await api.post(
    `${apiURL}/update-profile`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
}


export const topupPackageWallet = async (payload) => {
  const token = localStorage.getItem("token");
  const response = await api.post(
    `${apiURL}/topup-packageWallet`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};


export const getTopupPackageWalletHistory = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get(
    `${apiURL}/get-packageWallet-history`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};
export const getServiceLevelIncometHistory = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get(
    `${apiURL}/get-Service-level-income`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};



export const registerBulkuser = async (payload) => {
  const token = localStorage.getItem("token");
  const response = await api.post(
    `${apiURL}/register-users-bulk`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};


export const addMatchingByAdmin = async (payload) => {
  const response = await api.post(`${apiURL}/add-matching`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}


export const pinIdByAdmin = async (payload) => {
  const response = await api.post(`${apiURL}/pin-id`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}

export const deductFundByAdmin = async (payload) => {
  const response = await api.post(`${apiURL}/deduct-funds`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}
export const adminLoign = async (payload) => {
  const response = await api.post(`${apiURL}/user-login-by-admin`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}


export const getDeductFundHistoryByAdmin = async () => {
  const response = await api.get(`${apiURL}/get-all-deduct-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}



export const getPrincipalWithdrawalHistory = async () => {
  const response = await api.get(`${apiURL}/get-principal-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export const approvePrincipalWithdrawal = async (id) => {
  const response = await api.get(`${apiURL}/approve-principal-withdrawal/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}

export const rejectPrincipalWithdrawal = async (payload) => {
  const response = await api.post(`${apiURL}/reject-principal-withdrawal`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}



export const getUerDetails = async (payload) => {
  const response = await api.post(`${apiURL}/get-user-name`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}


export const sendOtpForAdminLogin = async (payload) => { 
  const response = await api.post(`${apiURL}/send-otp`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}

export const addBotBusinessByAdmin = async (payload) => {
  const response = await api.post(`${apiURL}/add-virtual-user-for-bot-service`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}


export const addFundBusinessByAdmin = async (payload) => {
  const response = await api.post(`${apiURL}/add-business`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}


export const activateMaintenanceMode = async (payload) => {
  const response = await api.post(`${apiURL}/toggle-maintenance`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}

export const getMaintenanceModeSettings = async () => {
  const response = await api.get(`${apiURL}/get-maintenance-mode-status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}

export const blockTradeIncome = async (payload) => {
  const response = await api.post(`${apiURL}/block-trade-income`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}

export const deductInvestmentAmount = async (payload) => {
  const response = await api.post(`${apiURL}/deduct-amount-from-investment`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}