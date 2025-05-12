import axios from 'axios';

const API_URL = 'https://consultancy-project-backend-wouc.onrender.com/api';

export const createOrder = async (orderData: any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please login first.');
    }

    const response = await axios.post(`${API_URL}/orders`, orderData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.error || 'Failed to create order');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check if the server is running.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || 'Failed to create order');
    }
  }
};

export const getOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login first.');
    }

    const response = await axios.get(`${API_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Failed to fetch orders');
    } else if (error.request) {
      throw new Error('No response from server. Please check if the server is running.');
    } else {
      throw new Error(error.message || 'Failed to fetch orders');
    }
  }
};