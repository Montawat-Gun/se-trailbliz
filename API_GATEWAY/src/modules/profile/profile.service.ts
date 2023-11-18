import { Injectable } from '@nestjs/common';
import axios from 'axios';

const PROFILE_BASE_URL = process.env.PROFILE_BASE_URL;

@Injectable()
export class ProfileService {
  async getAll(): Promise<any> {
    try {
      const response = await axios.get(`${PROFILE_BASE_URL}/profile`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async get(id: string): Promise<any> {
    try {
      const response = await axios.get(`${PROFILE_BASE_URL}/profile/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async create(profileDto: any): Promise<any> {
    try {
      const response = await axios.post(`${PROFILE_BASE_URL}/profile`, profileDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, profileDto: any): Promise<any> {
    try {
      const response = await axios.put(`${PROFILE_BASE_URL}/profile/${id}`, profileDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${PROFILE_BASE_URL}/profile/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
