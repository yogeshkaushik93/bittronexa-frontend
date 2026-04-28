import api from "../utils/axiosInstance";

const apiURL = "/users";
const token = localStorage.getItem("token");

export async function raiseSupportRequest(payload) {
  const response = await api.post(`${apiURL}/support/create`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getComplainHistory() {
  const response = await api.get(`${apiURL}/support/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getUserTreeData() {
  const response = await api.get(`${apiURL}/get-binary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function sendOtpValidateEmail(payload) {
  const response = await api.post(`${apiURL}/forgot-password`, payload);
  return response?.data;
}

export async function resetPasswordApi(payload) {
  const response = await api.post(`${apiURL}/reset-password`, payload);
  return response?.data;
}

export async function buyPlanPackage(payload) {
  const response = await api.post(`${apiURL}/buy-package`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getCustomPlanList() {
  const response = await api.get(`${apiURL}/all-packages`);
  return response?.data;
}

export async function getBannerListUser() {
  const response = await api.get(`${apiURL}/get-banners`);
  return response?.data;
}
export async function getReferralIncomeHistory() {
  const response = await api.get(`${apiURL}/getreferal-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response?.data;
}
export async function RoiIncomeAPi() {
  const response = await api.get(`${apiURL}/getRoi-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response?.data;
}
export async function LevelIncomeApi() {
  const response = await api.get(`${apiURL}/getLevelIncome-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response?.data;
}

export async function getLevelUsersDetails() {
  const response = await api.get(`${apiURL}/getLevelUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function packageAmount() {
  const response = await api.get(`${apiURL}/get-deposit-amount`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function clearBannerNotification() {
  const response = await api.get(`${apiURL}/change-blink`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function registerEmailForUser(payload) {
  const response = await api.post(`${apiURL}/add-email`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function verifyEmailOtp(payload) {
  const response = await api.post(`${apiURL}/verify-email`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

// *******************************************************************************************

export const getServicePackages = async () => {
  const response = await api.get(`${apiURL}/get-service-package`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const purchaseServicePackage = async (payload) => {
  const response = await api.post(`${apiURL}/activate-service`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const purchaseServicePackageByPackageWallet = async (payload) => {
  const response = await api.post(
    `${apiURL}/activate-service-by-wallet`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );
  return response?.data;
};

export const getActiveService = async () => {
  const response = await api.get(`${apiURL}/get-service-history-by-id`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const setWalletAddress = async (payload) => {
  const response = await api.post(`${apiURL}/set-wallet`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const updateUserProfile = async (payload) => {
  const response = await api.post(`${apiURL}/update`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getUserDirectTeam = async () => {
  const response = await api.get(`${apiURL}/get-direct-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getMatchingIncomeHistory = async () => {
  const response = await api.get(`${apiURL}/get-matching-income`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getClubIncomeHistory = async () => {
  const response = await api.get(`${apiURL}/get-club-income-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getRewardIncomeHistory = async () => {
  const response = await api.get(`${apiURL}/get-matching-rank-reward-income`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getInvestmentHistory = async () => {
  const response = await api.get(`${apiURL}/investment-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const makeP2PTransfer = async (payload) => {
  const response = await api.post(`${apiURL}/p2p-transfer`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getP2PTransferHistory = async () => {
  const response = await api.get(`${apiURL}/p2p-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const fetchUserByUsername = async (payload) => {
  const response = await api.post(`${apiURL}/get-username`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const withdrawalRequest = async (payload) => {
  console.log(token);

  const response = await api.post(`${apiURL}/withdraw-request`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const withdrawalRequestPrinciple = async (payload) => {
  console.log(token);

  const response = await api.post(`${apiURL}/withdraw-principal`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getLeftRightUsers = async (userId) => {
  const response = await api.get(`${apiURL}/tree/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getBusinessDetails = async () => {
  const response = await api.get(`${apiURL}/total-business`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getAdminTopupPackageWalletHistory = async () => {
  const response = await api.get(`${apiURL}/get-package-wallet-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const sendOtpForWithdrawal = async () => {
  const response = await api.post(
    `${apiURL}/send-otp`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );
  return response?.data;
};

export const makeInvestmentByPackageWallet = async (payload) => {
  const response = await api.post(
    `${apiURL}/buy-package-by-package-wallet`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );
  return response?.data;
};

export const swapMainToPackage = async (payload) => {
  const response = await api.post(`${apiURL}/swap`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const sendOtptoUserP2p = async (payload) => {
  // console.log(token)
  const response = await api.post(`${apiURL}/send-otp-p2p`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const sendOtptoUser = async (payload) => {
  // console.log(token)
  const response = await api.post(`${apiURL}/send-otp`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const setupTransactionPassword = async (payload) => {
  // console.log(token)
  const response = await api.post(`${apiURL}/add-tnx-password`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getSwapHistory = async () => {
  const response = await api.get(`${apiURL}/get-swap-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getActivationDate = async () => {
  const response = await api.get(`${apiURL}/get-activation-date`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const getFastTrackIncome = async () => {
  const response = await api.get(`${apiURL}/get-fast-track-income`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const getIbIncome = async () => {
  const response = await api.get(`${apiURL}/get-ib-income`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const getServiceLevelIncome = async () => {
  const response = await api.get(`${apiURL}/get-service-level-income`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const getInvoice = async () => {
  const response = await api.get(`${apiURL}/get-invoice`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
// export const sendOtpForResetPass = async () => {
//   const response = await api.post(`${apiURL}/send-reset-otp`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     withCredentials: true,
//   });
//   return response?.data;
// }

export async function getUserByName(payload) {
  const token = localStorage.getItem("token");
  const response = await api.post(`${apiURL}/get-username`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}
export async function resetPassword(payload) {
  const token = localStorage.getItem("token");
  const response = await api.post(`${apiURL}/reset-password`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}
export async function sendOtpForResetPass(payload) {
  const token = localStorage.getItem("token");
  const response = await api.post(`${apiURL}/send-reset-otp`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}

export async function topupUserAccount(payload) {
  const token = localStorage.getItem("token");
  const response = await api.post(`${apiURL}/activate-service`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}
export async function getNameByRefrel(payload) {
  const token = localStorage.getItem("token");
  const response = await api.post(`${apiURL}/get-name`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
}

export const makeInvestmentToUser = async (payload) => {
  const response = await api.post(`${apiURL}/add-investment-to-user`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
export const getTotalTeams = async (payload) => {
  const response = await api.post(`${apiURL}/get-total-teams`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const activateUserId = async (payload) => {
  const response = await api.post(`${apiURL}/activate-user-by-pin`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const getBusinessPlanHistory = async (payload) => {
  const response = await api.post(`${apiURL}/get-business`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getDeductFundByAdmin = async () => {
  const response = await api.get(`${apiURL}/get-all-deduct-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getServicePackageActivationHistory = async () => {
  const response = await api.get(`${apiURL}/get-service-history-by-id`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getMonthlyClosingReport = async () => {
  const response = await api.get(`${apiURL}/get-closing-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const getPrincipalWithdrawalHistory = async () => {
  const response = await api.get(`${apiURL}/get-principal-withdrawal-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getInvestedHistory = async () => {
  const response = await api.get(`${apiURL}/get-invested-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getActiveServiceOther = async () => {
  const response = await api.get(`${apiURL}/get-service-invest-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};

export const getPinIdHistory = async () => {
  const response = await api.get(`${apiURL}/get-pin-id-activated-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
};
export const setExperiencePassword = async (payload) => {
  const response = await api.post(
    `${apiURL}/set-experience-password`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );
  return response?.data;
};
