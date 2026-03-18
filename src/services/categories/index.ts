import { axios_instance } from "@/apis";

export const getCategoriesList = async () => {
  return axios_instance.get(`/store/categories?order=rank&limit=999`);
};
