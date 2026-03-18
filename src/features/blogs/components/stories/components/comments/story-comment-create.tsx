import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon, SmileIcon, UserIcon } from "lucide-react";

export const StoryCommentCreate = () => {
  return (
    <div className="flex justify-start items-start gap-2">
      <Avatar>
        <AvatarImage src="/images/blog/home/livestream-logo.png" />
        <AvatarFallback>
          <UserIcon className="size-4" />
        </AvatarFallback>
      </Avatar>

      <div className="w-full border border-neutral-200 rounded-lg p-2">
        <Textarea
          placeholder={"Bình luận của bạn..."}
          rows={3}
          className="w-full border-none outline-none shadow-none focus-visible:border-none focus-visible:ring-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-offset-0"
        />
        <div className="flex justify-between items-center">
          <SmileIcon className="size-6 text-neutral-300" />
          <Button className="p-0 px-4 bg-[#EBEBF0] hover:bg-neutral-200 rounded-lg text-black">
            Gửi <SendIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
