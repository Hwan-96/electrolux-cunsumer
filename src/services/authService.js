import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.electrolux.com/api';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const checkIdDuplicate = async (memberId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/check-id/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('ID check failed:', error);
    throw error;
  }
}; 