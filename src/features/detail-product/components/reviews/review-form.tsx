"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import RatingStar from "@/components/ui/rating-star";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Heading from "../atom/heading";

import { z } from "zod";

const formSchema = z.object({
  content: z.string().min(2).max(50),
});

const ReviewForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="p-[24px] space-y-[16px] border border-[#c4c4cf] rounded-[8px]">
      <Heading title="Đánh giá của bạn" variant="secondary" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[12px]">
          <RatingStar
            className="gap-[4px]"
            total={5}
            amount={4}
            width={26}
            height={26}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Nhận xét</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="px-[16px] py-[8px] min-h-[103px]"
                    placeholder="Mọi sản phẩm đều có ưu nhược điểm riêng, hãy chia sẻ đánh giá của bạn về sản phẩm nhé."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Gửi đánh giá</Button>
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
