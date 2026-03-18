import { axios_instance } from "@/apis";

export const getBrands = async () => {
  return (await axios_instance.get("/store/brands")).data;
};
