import ApiService from "../../Common/services/apiService";
const AUTH_PATH_API = "auth";

class AuthApi extends ApiService {
  constructor() {
    super(AUTH_PATH_API);
  }

  login(credentials) {
    return this.post("/login", credentials);
  }

  refreshToken() {
    return this.post("/token");
  }

  register(userData) {
    return this.post("/register", userData);
  }
  
  me() {
    return this.get("/me");
  }

  logout() {
    // Optionnel : si vous voulez implémenter une déconnexion côté serveur
    return this.post("/logout");
  }
}

const authApi = new AuthApi();

export default authApi;
