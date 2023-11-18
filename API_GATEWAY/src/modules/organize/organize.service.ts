import { Injectable } from "@nestjs/common";
import axios from "axios";

const ORGANIZE_BASE_URL = process.env.ORGANIZE_BASE_URL;

@Injectable()
export class OrganizeService {
  async getAll(): Promise<any> {
    try {
      const response = await axios.get(`${ORGANIZE_BASE_URL}/organize`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async get(id: string): Promise<any> {
    try {
      const response = await axios.get(`${ORGANIZE_BASE_URL}/organize/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async create(organizeDto: any): Promise<any> {
    try {
      const response = await axios.post(`${ORGANIZE_BASE_URL}/organize`, organizeDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, organizeDto: any): Promise<any> {
    try {
      const response = await axios.put(`${ORGANIZE_BASE_URL}/organize/${id}`, organizeDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${ORGANIZE_BASE_URL}/organize/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async applyOrganize(body: any): Promise<any> {
    try {
      const response = await axios.post(`${ORGANIZE_BASE_URL}/organize/applyOrganize/`, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async endOrganize(body: any): Promise<any> {
    try {
      const response = await axios.post(`${ORGANIZE_BASE_URL}/organize/endOrganize`, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
