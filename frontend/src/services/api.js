import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const searchPlayers = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/players/search`, {
    params: { q: query }
  });
  return response.data;
};

export const getPlayer = async (playerId) => {
  const response = await axios.get(`${API_BASE_URL}/players/${playerId}`);
  return response.data;
};

export const getAllPlayers = async () => {
  const response = await axios.get(`${API_BASE_URL}/players`);
  return response.data;
};
