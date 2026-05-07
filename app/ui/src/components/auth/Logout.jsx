import AuthService from "../../services/auth.service";

function Logout() {
  AuthService.logout()
  .then((response) => {
    sessionStorage.clear();
    window.location = '/';
  })
  .catch((error) => {
     console.error(error);
  });
}

export default Logout;