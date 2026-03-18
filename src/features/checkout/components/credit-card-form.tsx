"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const formSchema = z.object({
  card_number: z
    .string()
    .regex(
      /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
      "Số thẻ phải theo định dạng xxxx xxxx xxxx xxxx"
    ),
  name_holder: z
    .string()
    .regex(
      /^[A-Z\s]+$/,
      "Tên chủ thẻ chỉ chứa chữ cái viết hoa và khoảng trắng"
    ),
  experied_date: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Ngày hết hạn phải theo định dạng MM/YY"
    ),
  ccv: z.string().regex(/^\d{3,4}$/, "CCV phải là 3 hoặc 4 chữ số"),
});

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      card_number: "",
      name_holder: "",
      experied_date: "",
      ccv: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "") // Loại bỏ ký tự không phải số
      .slice(0, 16) // Giới hạn 16 chữ số
      .replace(/(\d{4})(?=\d)/g, "$1 "); // Thêm khoảng trắng sau mỗi 4 chữ số
  };

  const formatExpiredDate = (value: string) => {
    // Loại bỏ ký tự không hợp lệ
    value = value.replace(/[^0-9/]/g, "");

    // Xóa ký tự "/" nếu có nhiều hơn 1
    if (value.indexOf("/") !== value.lastIndexOf("/")) {
      value = value.slice(0, value.lastIndexOf("/"));
    }

    // Thêm "/" sau 2 số đầu tiên nếu cần
    if (value.length > 2 && !value.includes("/")) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    // Chỉ lấy tối đa 5 ký tự theo định dạng MM/YY
    value = value.slice(0, 5);

    // Kiểm tra tháng hợp lệ (01-12)
    const [month] = value.split("/");
    if (month && parseInt(month, 10) > 12) {
      value = "12" + (value.length > 2 ? value.slice(2) : "");
    }

    return value;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relativemax-w-3xl w-full mx-auto flex flex-1 flex-col justify-between pb-4"
      >
        <div className="grid grid-cols-1 gap-5">
          <FormField
            control={form.control}
            name="card_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số thẻ</FormLabel>
                <FormControl>
                  <Input
                    placeholder="xxxx xxxx xxxx xxxx"
                    type="text"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(formatCardNumber(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name_holder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên chủ thẻ</FormLabel>
                <FormControl>
                  <Input
                    placeholder="NGUYEN VAN A"
                    type="text"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          .replace(/[^a-zA-Z\s]/g, "")
                          .toLocaleUpperCase()
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              <FormField
                control={form.control}
                name="experied_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày hết hạn (MM/YY)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MM/YY"
                        type="text"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(formatExpiredDate(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-4">
              <FormField
                control={form.control}
                name="ccv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CCV</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123"
                        type="text"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value.replace(/\D/g, "").slice(0, 4)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 py-2 bg-white border-t border-t-gray-200">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
