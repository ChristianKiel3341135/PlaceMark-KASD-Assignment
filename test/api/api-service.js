import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const apiService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

//Category service
  async createCategory(category) {
    const res = await axios.post(`${this.placemarkUrl}/api/categories`, category);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/categories/${id}`);
    return res.data;
  },

  async getAllCategories() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/categories`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllCategories() {
    const res = await axios.delete(`${this.placemarkUrl}/api/categories`);
    return res.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/categories/${id}`);
    return response;
  },

  //Placemark service
  async createPlacemark(id, placemark) {
    const res = await axios.post(`${this.placemarkUrl}/api/categories/${id}/placemarks`, placemark);
    return res.data;
  },

  async getPlacemark(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async getAllPlacemarks() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/placemarks`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllPlacemarks() {
    const res = await axios.delete(`${this.placemarkUrl}/api/placemarks`);
    return res.data;
  },

  async deletePlacemark(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
