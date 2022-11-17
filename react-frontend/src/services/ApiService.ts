import axios from "axios";

export const BASE_URL = "http://localhost:8080/api"
export const USER_API = "/users";
export const INVOICE_API = "/invoice";
export const DOWNLOAD_API = "/download";

class ApiService {
  getUsers() {
    return axios.get(BASE_URL + USER_API);
  }
  generateInvoice(idsParam: String) {
    return axios.get(BASE_URL + INVOICE_API, { params: { ids: idsParam } });
  }
}

export default new ApiService();
