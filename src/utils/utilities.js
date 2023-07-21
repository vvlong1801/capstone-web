export const formatSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const setAxiosBaseUrl = (role) => {
  if (role == 'admin' || role == 'superAdmin') {
    window.axios.defaults.baseURL = import.meta.env.VITE_BASE_URL + '/admin';
    console.log('role admin');
  } else if (role == 'creator') {
    window.axios.defaults.baseURL = import.meta.env.VITE_BASE_URL + '/creator';
    console.log('role creator');
  }
};

// export const formatDate = (input) => {
//   let date = moment(input);
//   let formattedDate = date.format('DD/MM/YYYY');

//   return formattedDate;
// }