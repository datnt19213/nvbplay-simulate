import {GetData} from "@/apis";

const APIPDW = "https://open.oapi.vn/location";

export const transformAddressData = (data: any) => {
  if (data) {
    return data.map((item: any) => ({
      id: item.id,
      label: item.name,
      value: item.name,
    }));
  }
};

export const getAllProvince = async () => {
  const response = (await GetData(
    `${APIPDW}/provinces?page=0&size=100`
  )) as any;
  if (response) {
    const convertData = transformAddressData(response?.data);
    return {rootData: response?.data, convertData: convertData};
  }
};
export const getAllDistrict = async (provindId: any) => {
  const response = (await GetData(
    `${APIPDW}/districts/${provindId}?page=0&size=100`
  )) as any;
  if (response) {
    const convertData = transformAddressData(response?.data);
    return {rootData: response?.data, convertData: convertData};
  }
};
export const getAllWard = async (districtId: any) => {
  const response = (await GetData(
    `${APIPDW}/wards/${districtId}?page=0&size=100`
  )) as any;
  if (response) {
    const convertData = transformAddressData(response?.data);
    return {rootData: response?.data, convertData: convertData};
  }
};
