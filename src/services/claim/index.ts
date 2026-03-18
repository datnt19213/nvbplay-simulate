import { axios_instance } from "@/apis";

export const getReturnReason = async () => {
  return (await axios_instance.get(`/store/return-reasons`)).data;
};
