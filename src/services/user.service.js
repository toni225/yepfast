import axios from "axios";

//--------Change the url if what you will use
const baseURL = "http://localhost:4000/v1/user";
// const baseURL = "https://yepfastapi.vercel.app/v1/user";

//==============================Parking APIs=========================
export const getAllParking = async () => {
  const getAllParkingEndpoint = `${baseURL}/all`;
  const apiResponse = axios.get(getAllParkingEndpoint);
  return apiResponse;
};

export const getParking = async (id) => {
  const getParkingEndpoint = `${baseURL}/${id}`;
  const apiResponse = axios.get(getParkingEndpoint);
  return apiResponse;
};

export const editParking = async (id, payload) => {
  const getEditParkingEndpoint = `${baseURL}/${id}`;
  const apiResponse = axios.put(getEditParkingEndpoint, payload);
  return apiResponse;
};

export const createParking = async (payload) => {
  const getCreateParkingEndpoint = `${baseURL}/create`;
  const apiResponse = axios.post(getCreateParkingEndpoint, payload);
  return apiResponse;
};

export const removeParking = async (id) => {
  const getRemoveParkingEndpoint = `${baseURL}/${id}`;
  const apiResponse = axios.delete(getRemoveParkingEndpoint);
  return apiResponse;
};

export const uploadImageParking = async (username, formData) => {
  const getUploadImageParkingEndpoint = `${baseURL}/img/${username}`;
  const apiResponse = axios.post(getUploadImageParkingEndpoint, formData);
  return apiResponse;
};

export const getImageParking = async (username, parkingName) => {
  const getImageParkingEndpoint = `${baseURL}/img/${username}/${parkingName}`;
  const apiResponse = axios.get(getImageParkingEndpoint);
  return apiResponse;
};

export const getMyParking = async (username) => {
  const getMyParkingEndpoint = `${baseURL}/myparking/${username}`;
  const apiResponse = axios.get(getMyParkingEndpoint);
  return apiResponse;
};

//=======================user APIs====================================
export const signup = async (payload) => {
  const getSignupEndpoint = `${baseURL}/signup`;
  const apiResponse = axios.post(getSignupEndpoint, payload);
  return apiResponse;
};

export const login = async (payload) => {
  const getSigninEndpoint = `${baseURL}/signin`;
  const apiResponse = axios.post(getSigninEndpoint, payload);
  return apiResponse;
};

export const signout = async () => {
  const getSignoutEndpoint = `${baseURL}/signout`;
  const apiResponse = axios.post(getSignoutEndpoint);
  return apiResponse;
};

export const getUser = async (token) => {
  const getUserEndpoint = `${baseURL}/getuser/${token}`;
  const apiResponse = axios.get(getUserEndpoint);
  return apiResponse;
};

export const getUserInfo = async (id) => {
  const getUserInfoEndpoint = `${baseURL}/getuserinfo/${id}`;
  const apiResponse = axios.get(getUserInfoEndpoint);
  return apiResponse;
};

export const getSession = async () => {
  const getSession = `${baseURL}/getsession`;
  const apiResponse = axios.get(getSession);
  return apiResponse;
};

export const updateUser = async (id, payload) => {
  const getUpdateUserEndpoint = `${baseURL}/updateuser/${id}`;
  const apiResponse = axios.put(getUpdateUserEndpoint, payload);
  return apiResponse;
};

export const addUser = async (payload) => {
  const getAddUserEndpoint = `${baseURL}/adduserinfo`;
  const apiResponse = axios.post(getAddUserEndpoint, payload);
  return apiResponse;
};

export const resetPass = async (payload) => {
  const getResetPassEndpoint = `${baseURL}/resetpassword`;
  const apiResponse = axios.post(getResetPassEndpoint, payload);
  return apiResponse;
};

export const updatePass = async (payload) => {
  const getUpdatePassEndpoint = `${baseURL}/updatepassword`;
  const apiResponse = axios.post(getUpdatePassEndpoint, payload);
  return apiResponse;
};

export const getAllReports = async () => {
  const getAllReportsEndpoint = `${baseURL}/allreports`;
  const apiResponse = axios.get(getAllReportsEndpoint);
  return apiResponse;
};

export const getReports = async (ParkingID) => {
  const getAllReportsEndpoint = `${baseURL}/reports/${ParkingID}`;
  const apiResponse = axios.get(getAllReportsEndpoint);
  return apiResponse;
};

export const banParking = async (id) => {
  const banParkingEndpoint = `${baseURL}/reports/${id}`;
  const apiResponse = axios.delete(banParkingEndpoint);
  return apiResponse;
};

export const addReport = async (body) => {
  const addReportEndpoint = `${baseURL}/report`;
  const apiResponse = axios.post(addReportEndpoint, body);
  return apiResponse;
};

export const addParkingHistory = async (payload) => {
  const addParkingHistoryEndpoint = `${baseURL}/addparkinghistory`;
  const apiResponse = axios.post(addParkingHistoryEndpoint, payload);
  return apiResponse;
};

export const getParkingHistory = async (user) => {
  const getParkingHistoryEndpoint = `${baseURL}/getparkinghistory/${user}`;
  const apiResponse = axios.get(getParkingHistoryEndpoint);
  return apiResponse;
};
