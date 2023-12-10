import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '40715513-1d25e2f91f40f46af302a2c73';

export const fetchImages = async (userInput, page, configParams) => {
  const params = {
    key: API_KEY,
    q: userInput,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page,
    ...configParams,
  };

  const { data } = await axios.get('', { params });
  return data;
};
