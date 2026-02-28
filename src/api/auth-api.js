import { backendConfig } from "../constants/content/MainContent";
import api from "../utils/axiosInstance";
const loginApiBaseAUrl = "/users";
const token = localStorage.getItem("token");

export async function loginWithUserIDApi(payload) {
  console.log("Payload for /login:", payload); // 👈
  const response = await api.post(`${loginApiBaseAUrl}/login`, payload, {
    withCredentials: true,
  });
  return response?.data;
}
export async function loginWithWallet(payload) {
  const response = await api.post(`${loginApiBaseAUrl}/login`, payload, {
    withCredentials: true,
  });
  return response?.data;
}

export async function registerWithWallet(payload) {
  const finalPayload = {
    ...payload,
    referredBy: payload.referredBy || "NEXA8766",
  };

  const response = await api.post(
    `${loginApiBaseAUrl}/register`,
    finalPayload,
    {
      withCredentials: true,
    }
  );

  return response?.data;
}

export async function verifyRegisterOtp(payload) {
  const response = await api.post(
    `${loginApiBaseAUrl}/account/verify-otp`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function loginWithEmailAdminApi(payload) {
  const response = await api.post(
    `${loginApiBaseAUrl}/admin/login`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response?.data;
}
export async function registerWithEmailApi(payload, ref) {
  const response = await api.post(
    `${loginApiBaseAUrl}/register?referral=${ref}`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response?.data;
}
export async function getUserInfo() {
  const response = await api.get(`${loginApiBaseAUrl}/get-Profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAdminInfo() {
  const response = await api.get(`${loginApiBaseAUrl}/admin/getProfile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function loginWithEmailAdmin(payload) {
  const response = await api.post(
    `${loginApiBaseAUrl}/admin/login`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response?.data;
}

const userURL = backendConfig.base;

export async function createLevel() {
  const response = await api.get(`${userURL}/levels/create`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}





// ***************************************************************************************************************   



export const registerWithEmail = async (payload) => {
  const response = await api.post(`${loginApiBaseAUrl}/register`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export const loginWithEmail = async (payload) => {
  const response = await api.post(`${loginApiBaseAUrl}/login`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export const logoutUser = (redirectPath = "/login") => {
  try {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.removeItem("persist:root");
    window.location.replace(redirectPath);
  } catch (error) {
    console.error("Logout error:", error);
    window.location.replace("/login");
  }
};
