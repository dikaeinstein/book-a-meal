const axiosErrorWrapper = (error) => {
  // The request was made and the server responded with a status code
  // that falls out of the range of 2xx
  if (error.response) {
    const response = error.response;
    // Handle input validation error
    if (response.status === 400) {
      return response.data.error;
    }
    return response.data.message;
  }
  // The request was made but no response was received
  return error.request;
};

export default axiosErrorWrapper;
