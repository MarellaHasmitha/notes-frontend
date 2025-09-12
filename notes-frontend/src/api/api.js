import { API_URL } from "../config";

// REGISTER
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

// LOGIN
export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

// GET NOTES
export const getNotes = async (token) => {
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // send JWT token
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};
