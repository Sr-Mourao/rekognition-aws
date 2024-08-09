const getHeaders = () => {
  return {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "HEAD,OPTIONS,POST,GET,PATCH,PUT",
  };
};

module.exports = { getHeaders };
