import { axios_instance } from "@/apis";

export const getPromotionDatas = async () => {
  return (await axios_instance.get(`/store/promotions`)).data;
};
