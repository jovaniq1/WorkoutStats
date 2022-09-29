import axios from 'axios';
import React, { useContext } from 'react';

const API_URL = 'https://personalweb-api.herokuapp.com/graphql';
//const API_URL = 'http://192.168.0.110:8080/graphql';

const constOptions = {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  url: API_URL,
};

// localStorage.getItem('token', JSON.stringify(token));

export const createWebsite = async (data) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${data.token}`,
  };
  const options = {
    method: constOptions.method,
    headers,
    data: data.query,
    url: constOptions.url,
  };

  const response = await axios(options);

  return response.data;
};
// handles new appointments
export const apiGraphql = async (data) => {
  const headers = {
    ...constOptions.headers,
    Authorization: data?.token ? `Bearer ${data?.token}` : ``,
  };
  // console.log('apiGraphql sending ', data);
  try {
    const response = await axios.post(constOptions.url, data?.graphql, {
      headers,
    });
    // console.log('apiGraphql response ', response?.data);

    return response.data;
  } catch (err) {
    // console.log('apiGraphql error ', err?.response);
    return err?.response?.data;
  }
};
