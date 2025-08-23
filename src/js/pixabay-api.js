import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "51935119-94cca84236608ef27f9ff626b";

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page,
    per_page: perPage,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}