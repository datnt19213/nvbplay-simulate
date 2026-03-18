import Bounded from "@/components/base-components/containers/bounded";
import { Button } from "@/components/ui/button";
import { MailMinusIcon, MessageSquare, PhoneCall } from "lucide-react";

const DATA = [
  {
    id: "phone",
    icon: <PhoneCall className="size-8 stroke-[#FF3F1A] " />,
    title: "Hotline",
    content: "0987.879.243",
    desc: "08:00 - 21:30 từ T2 đến CN",
  },
  {
    id: "chat",
    icon: <MessageSquare className="size-8 stroke-[#FF3F1A] " />,
    title: "Chat trực tuyến",
    content: "Mở Chatbox",
    desc: "08:00 - 21:30 từ T2 đến CN",
  },
  {
    id: "mail",
    icon: <MailMinusIcon className="size-8 stroke-[#FF3F1A] " />,
    title: "Yêu cầu hỗ trợ",
    content: "Tạo yêu cầu",
    desc: "hoặc gửi mail đến  info@nvbplay.vn",
  },
];

const SupportInfoItem = ({ item }: { item: (typeof DATA)[0] }) => {
  return (
    <div className="w-full md:w-auto flex-1 flex flex-col items-center justify-center gap-4 bg-[#F5F5FA] p-4 rounded-lg">
      {item.icon}
      <div className="text-center text-sm font-medium">
        <div className="">{item.title}</div>
        {item.id !== "phone" ? (
          <Button className="font-medium text-sm py-1" size={"sm"}>
            {item.content}
          </Button>
        ) : (
          <div className="font-medium text-lg">{item.content}</div>
        )}
      </div>
      <div className="text-center text-neutral-500 text-sm font-medium">
        {item.desc}
      </div>
    </div>
  );
};

export const SupportInfo = () => {
  return (
    <Bounded className="bg-white rounded-lg">
      <div className="p-4">
        <h3 className="text-xl text-neutral-700 font-semibold mb-4">
          Hổ trợ khách hàng
        </h3>
        <div className="min-w-full w-full flex flex-col md:flex-row justify-between items-center gap-4">
          {DATA?.map((item, index) => (
            <SupportInfoItem key={index} item={item} />
          ))}
        </div>
      </div>
    </Bounded>
  );
};
