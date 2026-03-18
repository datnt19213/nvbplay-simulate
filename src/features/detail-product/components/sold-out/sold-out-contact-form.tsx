"use client";

import buildingStore from "@/assets/icons/building-store.svg";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  phoneNumber: z.string().min(2).max(50),
});

const SoldOutContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="font-[500] text-sm space-y-[20px]">
      <div className="text-red-primary flex items-center gap-[8px]">
        <Image src={buildingStore} width={20} alt="icon" height={20} />
        Tạm hết hàng
      </div>
      <div className="border border-[#e9e1fd] rounded-[8px] overflow-hidden">
        <div className="px-[16px] bg-gradient-to-r from-[rgba(255,63,26,0.12)] to-[rgba(240,152,64,0.12)] text-txtthird text-[14px] leading-[24px] font-[600] py-[10px]">
          Nhập thông tin của bạn
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-[20px] p-[16px] "
          >
            <div className="grid grid-cols-2 gap-[12px]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Họ tên</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
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
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        placeholder="Nhập số điện thoại"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm"
                      placeholder="Nhập địa chỉ email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Gửi thông tin
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SoldOutContactForm;
