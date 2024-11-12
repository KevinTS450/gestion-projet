import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { format } from 'date-fns';

import 'moment/locale/fr'; // N'oublie pas d'importer la locale française
export const API_URL = process.env.REACT_APP_API_URL


const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};


const setToken = (token) => {
  localStorage.setItem('token', token);
};

const redirectTo = (target) => {
  return window.location.href=target
}

const getToken = () => {
  return localStorage.getItem('token');
};

const getAuthHeadersUsers = () => {
  const token = serviceConfig.getToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

const getFilesHeaders = () => {
  return {
    'Content-Type': 'multipart/form-data',
  };
};



const clearToken = () => {
  localStorage.removeItem('token');
  window.location.href = '/auth';

};
const setCreationAccountStepArgs = (step1, step2, user) => {

  const data = {
    step_1: step1,
    step_2: step2,
    user: JSON.stringify(user)
  };

  localStorage.setItem('creationAccountArgs', JSON.stringify(data));
};

const getCreationStepArgs = () => {

  return localStorage.getItem('creationAccountArgs')
}




const dataCreationStepArgs = () => {
  const data = JSON.parse(getCreationStepArgs())
  return data

}
 const convertBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
};

const clearArgs = () => {
  return localStorage.removeItem('creationAccountArgs')
}

const argsStepCreation = (step) => {

  const data = dataCreationStepArgs()

  if (data) {


    if (step == 1) {

      return data.step_1
    }

    if (step == 2) {
      return data.step_2

    }


    if (step == 3) {
      return data.email

    }
  }


}

const convertDate = (date) => {
  
 return moment(date).format('DD MMMM YYYY');

}

const formatDateToUs = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based, pad with zero
  const day = String(d.getDate()).padStart(2, '0'); // Pad with zero

  return `${year}/${month}/${day}`;
}

const isTokenExpired = () => {
  const token = serviceConfig.getToken()

  if (!token) return true; 


  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000; 

  if(decoded.exp < currentTime) {
    return true
  }
};



const doGet = async (url, params = {}, headers = {} , responseType = 'json') => {
  try {
    const mergedHeaders = { ...defaultHeaders, ...headers };

    const response = await axios.get(url, {
      params,
      headers: mergedHeaders ,
      responseType
    });
    return response.data;
  } catch (error) {
    console.error('There was a problem with your GET request:', error);
    throw error;
  }
};

const doPost = async (url, data = {}, headers = {} ,params = {},) => {
  try {
    const mergedHeaders = { ...defaultHeaders, ...headers };

    const response = await axios.post(url, data, { params,headers: mergedHeaders });
    return response.data;
  } catch (error) {
    console.error('There was a problem with your POST request:', error);
    throw error;
  }
};


const doPut = async (url, data, headers = {}) => {
  try {
    const mergedHeaders = { ...defaultHeaders, ...headers };

    const response = await axios.put(url, data, { headers: mergedHeaders });
    return response.data;
  } catch (error) {
    console.error('There was a problem with your PUT request:', error);
    throw error;
  }
};


const doDelete = async (url, params = {}, headers = {}) => {
  try {
    const mergedHeaders = { ...defaultHeaders, ...headers };

    const response = await axios.delete(url, { params,headers: mergedHeaders });
    return response.data;
  } catch (error) {
    console.error('There was a problem with your DELETE request:', error);
    throw error;
  }
};

export const serviceConfig = {
  doGet,
  doDelete,
  doPost,
  doPut,
  API_URL,
  setToken,
  argsStepCreation,
  clearArgs,
  clearToken,
  getToken,
  getCreationStepArgs,
  setCreationAccountStepArgs,
  getAuthHeadersUsers ,
  redirectTo ,
  isTokenExpired ,
  getFilesHeaders ,
  convertBytes ,
  convertDate ,
  formatDateToUs
}


