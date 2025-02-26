import axios from 'axios';
import { Scooter, ScooterModel, MaintenanceDTO } from '../types/Scooter';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Scooter API
export const getScooters = async (): Promise<Scooter[]> => {
  const response = await api.get('/scooters');
  return response.data;
};

export const getScooterById = async (id: number): Promise<Scooter> => {
  const response = await api.get(`/scooters/${id}`);
  return response.data;
};

export const createScooter = async (scooter: Omit<Scooter, 'id'>): Promise<Scooter> => {
  const response = await api.post('/scooters', scooter);
  return response.data;
};

export const updateScooter = async (id: number, scooter: Partial<Scooter>): Promise<Scooter> => {
  const response = await api.put(`/scooters/${id}`, scooter);
  return response.data;
};

export const deleteScooter = async (id: number): Promise<void> => {
  await api.delete(`/scooters/${id}`);
};

// ScooterModel API
export const getScooterModels = async (): Promise<ScooterModel[]> => {
  const response = await api.get('/scooter-models');
  return response.data;
};

export const getScooterModelById = async (id: number): Promise<ScooterModel> => {
  const response = await api.get(`/scooter-models/${id}`);
  return response.data;
};

// Maintenance API
export const getMaintenances = async (): Promise<MaintenanceDTO[]> => {
  const response = await api.get('/maintenances');
  return response.data;
};

export const getMaintenanceById = async (id: number): Promise<MaintenanceDTO> => {
  const response = await api.get(`/maintenances/${id}`);
  return response.data;
};

export const createMaintenance = async (maintenance: Omit<MaintenanceDTO, 'id'>): Promise<MaintenanceDTO> => {
  const response = await api.post('/maintenances', maintenance);
  return response.data;
};

export const updateMaintenance = async (id: number, maintenance: Partial<MaintenanceDTO>): Promise<MaintenanceDTO> => {
  const response = await api.put(`/maintenances/${id}`, maintenance);
  return response.data;
};

export default api;
