import axios from 'axios';

export default async function callApi(endpoint, method = 'GET', data, headers) {
  try {
    const resp = await axios({
      method: method,
      url: `https://6317faa1f6b281877c606715.mockapi.io/api/v1/${endpoint}`,
      data: data,
      headers: headers,
    });
    return {
      success: true,
      ...resp,
    };
  } catch (error) {
    return {
      error: true,
      ...error,
    };
  }
}
