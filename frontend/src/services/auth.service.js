import axios from "axios";
import { API_URL, ACCESS_TOKEN, CURRENT_USER } from "../common/constants";
import { apiLogin } from "../utils/AppUtils";

const register = ({userName, email, password,cognizantId,confPassword}) => {
  return axios.post(API_URL + "/auth/signup", {
    userName,
    email,
    password,
    cognizantId,
    confPassword
  });
};

const email = ({email}) => {
  return axios.post(API_URL + "/auth/verify",{email});
} 

const verifyOtp = ({otp}) => {
  return axios.post(API_URL + "/auth/verify-otp",{otp});
}

const forget = ({password, confirmPassword, email}) => {
  return axios.post(API_URL + "/auth/update-password",{password, confirmPassword, email});
}

const login = (loginRequest) => {
  return apiLogin(loginRequest).then((response) => {
    localStorage.setItem(ACCESS_TOKEN, response.jwt.accessToken);
    localStorage.setItem(CURRENT_USER, response.userName);
  });
};

const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(CURRENT_USER);
};

const getCurrentUser = () => {
  return localStorage.getItem(CURRENT_USER);
};



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  email,
  verifyOtp,
  forget
};


export default AuthService;
