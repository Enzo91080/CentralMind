import ApiService from "../../Common/services/apiService";
const CATEGORY_PATH_API = "categories";

class CategoryApi extends ApiService {
  constructor() {
    super(CATEGORY_PATH_API);
  }

  getAllCategories() {
    return this.get("");
  }

  getCategoryById(id) {
    return this.get(`/${id}`);
  }

  createCategory(data) {
    return this.post("", data);
  }

  updateCategory(id, data) {
    return this.put(`/${id}`, data);
  }

  deleteCategory(id) {
    return this.delete(`/${id}`);
  }
}

const categoryApi = new CategoryApi();

export default categoryApi;