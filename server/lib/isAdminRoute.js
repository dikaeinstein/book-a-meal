
const checkAdminRoute = (path) => {
  const pattern = /\/caterer\/auth\/(signin|signup)/i;
  if (pattern.test(path)) {
    return true;
  }
  return false;
};

export default checkAdminRoute;
