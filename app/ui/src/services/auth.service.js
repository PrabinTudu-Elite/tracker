import http from "./http-common";

class AuthService {
  register(username,email,password) {
    return http
      .post("/auth/register", {
        username: username,
        email: email,
        password: password,
      });
  }

  login(email,password) {
    return http
      .post("/auth/login", {
        email: email,
        password: password
      });
  }

  logout() {
    sessionStorage.clear();
    window.location = '/';
  }

   
}

export default new AuthService();