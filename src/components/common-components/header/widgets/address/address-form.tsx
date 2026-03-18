"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputLabel from "@/components/base-components/input/input-label";
import { Combobox } from "@/components/base-components/input/combobox";
import { COMMON_DATA } from "@/configs";
import { Checkbox } from "@/components/ui/checkbox";
import { AddressModalType } from "./type";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  createUserAddressData,
  getGoShipCities,
  getGoShipDistricts,
  getGoShipWards,
} from "@/services/addresses";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setListAddress,
  setUserAddressData,
} from "@/stores/datas/addresses-data-slice";
import { RootState } from "@/stores";
import { ToastDismiss, ToastSuccess } from "@/components/base-components/toast";
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Tên người nhận phải có ít nhất 2 ký tự",
  }),
  phoneNumber: z.string().regex(/^((03|05|07|08|09)+([0-9]{8}))$/, {
    message: "Số điện thoại không đúng định dạng",
  }),
  houseNumber: z.string().min(2, {
    message: "Vui lòng nhập số nhà hoặc tên đường",
  }),
  province: z.string().min(1, {
    message: "Vui lòng chọn tỉnh/thành phố",
  }),
  district: z.string().min(1, {
    message: "Vui lòng chọn quận/huyện",
  }),
  ward: z.string().min(1, {
    message: "Vui lòng chọn phường/xã",
  }),
  type: z.enum(["house", "office"]),
  isDefault: z.boolean().default(false).optional(),
});
const AddressForm = ({ setOpen, setActiveAddress }: AddressModalType) => {
  const dispatch = useDispatch();
  const { listAddress } = useSelector(
    (state: RootState) => state.users_address_data
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      houseNumber: "",
      province: "",
      district: "",
      ward: "",
      type: "house",
      isDefault: false,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const substring = (value: string) => {
    return value.substring(value.lastIndexOf("_"), value.length);
  };

  useEffect(() => {
    const fetchCities = async () => {
      const response = await getGoShipCities();

      if (response && response.code === 200) {
        const convertValue = response.data.map((value: any) => ({
          value: value.id,
          label: value.name,
        }));

        setCities(convertValue);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      const province = form.getValues("province");

      if (!province) return; // Chờ province được chọn
      const response = await getGoShipDistricts(province);
      if (response && response.code === 200) {
        const convertValue = response.data.map((value: any) => ({
          value: value.id,
          label: value.name,
        }));
        setDistricts(convertValue);
      } else {
        setDistricts([]); // Xóa dữ liệu cũ nếu không có phản hồi
      }
    };
    fetchDistricts();
  }, [form.watch("province")]);

  useEffect(() => {
    const fetchWards = async () => {
      const district = form.getValues("district");
      const province = form.getValues("province");
      if (!district || !province) return; // Chờ district và province được chọn
      const response = await getGoShipWards(district, province);
      if (response && response.code === 200) {
        const convertValue = response.data.map((value: any) => ({
          value: value.id.toString(),
          label: value.name,
        }));

        setWards(convertValue);
      } else {
        setWards([]); // Xóa dữ liệu cũ nếu không có phản hồi
      }
    };
    fetchWards();
  }, [form.watch("district"), form.watch("province")]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const data = {
      first_name: values.username,
      phone: values.phoneNumber,
      address_1: values.houseNumber,
      is_default_shipping: listAddress?.length === 0 ? true : values.isDefault,
      city: (
        cities.find((city) => city.value === values.province)?.label || ""
      ).toString(),
      country_code: values.province,
      province: (
        districts.find((district) => district.value === values.district)
          ?.label || ""
      ).toString(),

      metadata: {
        city_id: values.province,
        district_id: values.district,
        ward_id: values.ward,
        type: values.type,
      },
    };

    const response = await createUserAddressData(data);

    if (response) {
      setOpen(false);
      if (values.isDefault) {
        const addressNew = response?.customer?.addresses.find(
          (item: any) => item.is_default_shipping
        );
        if (addressNew) {
          dispatch(setUserAddressData(addressNew));
        } else {
          dispatch(
            setUserAddressData(
              response.customer.addresses[
                response?.customer?.addresses?.length - 1 || 0
              ]
            )
          );
        }
      }
      dispatch(setListAddress(response.customer.addresses));
      setActiveAddress &&
        setActiveAddress(
          response?.customer?.addresses[
            response?.customer?.addresses?.length - 1 || 0
          ]
        );
      form.reset();
      ToastDismiss();
      ToastSuccess({
        msg: "Thêm địa chỉ thành công",
        className: "",
      });
    }
    setIsLoading(false);
  }
  return (
    <div className="w-full h-full pt-4">
      <Form {...form}>
        <form
          className="w-full h-full flex flex-col justify-between "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 overflow-y-auto px-4 py-2 scrollbar-none h-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputLabel
                      sizes="small"
                      label="Họ và tên"
                      placeholder="Nhập tên người nhận"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputLabel
                      sizes="small"
                      label="Số điện thoại"
                      placeholder="Nhập số điện thoại"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[^0-9]/g, ""); // Loại bỏ ký tự không phải số
                      }}
                      className="appearance-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="houseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputLabel
                      sizes="small"
                      label="Số nhà"
                      placeholder="Số nhà (Ví dụ: Số 1 đường Nguyễn Văn Linh)"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      label="Tỉnh/Thành phố"
                      placeholder="Chọn tỉnh/thành phố"
                      items={cities}
                      onSelect={(value) => {
                        form.setValue("province", value);
                      }}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              disabled={!form.getValues("province")}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      label="Quận/Huyện"
                      placeholder="Chọn quận/huyện"
                      items={districts}
                      onSelect={(value) => {
                        form.setValue("district", value);
                      }}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ward"
              disabled={!form.getValues("district")}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      label="Phường/Xã"
                      placeholder="Chọn phường/xã"
                      items={wards}
                      onSelect={(value) => {
                        form.setValue("ward", value);
                      }}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="lg:col-span-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-900 dark:text-neutral-300 font-medium text-sm mb-2">
                      Loại địa chỉ
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <div className="flex items-center gap-2">
                          <FormItem className="mt-1">
                            <FormControl>
                              <RadioGroupItem
                                value="house"
                                className="peer sr-only"
                              />
                            </FormControl>
                            <FormLabel className="font-normal p-2 [&:has([data-state=checked])]:border-1 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600 rounded-lg border relative">
                              {field.value === "house" && (
                                <div className="absolute size-[13px] rounded-bl-lg rounded-tr-md flex items-center justify-center text-white bg-blue-600 top-0 right-0">
                                  <Icon icon="ph:check" className="size-2.5" />
                                </div>
                              )}
                              Nhà riêng
                            </FormLabel>
                          </FormItem>
                          <FormItem className="mt-1">
                            <FormControl>
                              <RadioGroupItem
                                value="office"
                                className="peer sr-only"
                              />
                            </FormControl>
                            <FormLabel className="font-normal p-2  [&:has([data-state=checked])]:border-1 peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600 rounded-lg border relative">
                              {field.value === "office" && (
                                <div className="absolute size-[13px] rounded-bl-lg rounded-tr-md flex items-center justify-center text-white bg-blue-600 top-0 right-0">
                                  <Icon icon="ph:check" className="size-2.5" />
                                </div>
                              )}
                              Cơ quan
                            </FormLabel>
                          </FormItem>
                        </div>
                      </RadioGroup>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="lg:col-span-2">
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2 mt-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-200 bg-gray-100 rounded"
                        />
                      </FormControl>
                      <FormLabel className="text-neutral-900 dark:text-neutral-300 font-medium text-sm">
                        Đặt làm địa chỉ mặc định
                      </FormLabel>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="py-4 px-4 border-t border-t-gray-100">
            <div className="flex items-end justify-end gap-2">
              <Button
                variant="secondary"
                className="h-10 w-fit px-7"
                onClick={() => setOpen(false)}
              >
                Trở lại
              </Button>
              <Button className="h-10 w-fit px-7" disabled={isLoading}>
                {isLoading && <Loader className="size-4 animate-spin" />}
                {isLoading ? "Đang xử lý..." : "Thêm"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddressForm;
