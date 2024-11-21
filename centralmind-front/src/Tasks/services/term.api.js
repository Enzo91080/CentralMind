import ApiService from "../../Common/services/apiService";
const TERM_PATH_API = "terms";

class TermApi extends ApiService {
  constructor() {
    super(TERM_PATH_API);
  }

  getAllTerms() {
    return this.get("");
  }

  getTermById(id) {
    return this.get(`/${id}`);
  }

  createTerm(data) {
    return this.post("", data);
  }

  updateTerm(id, data) {
    return this.put(`/${id}`, data);
  }

  deleteTerm(id) {
    return this.delete(`/${id}`);
  }
}

const termApi = new TermApi();

export default termApi;