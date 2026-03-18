import { Brand } from "@/assets/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, Check, Clock } from "lucide-react";

const events = [
  {
    id: 1,
    type: "live",
    name: "Ngày hội giảm giá, săn ngay kẻo lỡ mất cơ hội ngàn năm có một",
    host: {
      image: Brand.src,
      name: "NVB Play",
      follower: 120000,
    },
    time: "2023-03-15 10:00:00",
    isSubcrible: false,
  },
  {
    id: 2,
    type: "live",
    name: "Ngày hội giảm giá, săn ngay kẻo lỡ mất cơ hội ngàn năm có một",
    host: {
      image: Brand.src,
      name: "NVB Play",
      follower: 120000,
    },
    time: "2023-03-15 10:00:00",
    isSubcrible: true,
  },
  {
    id: 3,
    type: "live",
    name: "Ngày hội giảm giá, săn ngay kẻo lỡ mất cơ hội ngàn năm có một",
    host: {
      image: Brand.src,
      name: "NVB Play",
      follower: 120000,
    },
    time: "2023-03-15 10:00:00",
    isSubcrible: false,
  },
  {
    id: 4,
    type: "live",
    name: "Ngày hội giảm giá, săn ngay kẻo lỡ mất cơ hội ngàn năm có một",
    host: {
      image: Brand.src,
      name: "NVB Play",
      follower: 120000,
    },
    time: "2023-03-15 10:00:00",
    isSubcrible: false,
  },
];

const CarouselEvent = () => {
  const items = events.map((event) => (
    <CarouselItem
      key={event.id}
      className="basis-3/4 md:basis-1/2 desktop:basis-1/3"
    >
      <div className="p-4 flex flex-col  items-start justify-start gap-4 rounded-lg bg-white overflow-hidden">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-start justify-start gap-1">
            <Badge className="bg-[#D93843] text-white text-[11px] px-1 rounded">
              Sự kiện LIVE
            </Badge>
            <p className="text-sm desktop:text-lg font-semibold">
              {event.name}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Avatar className="size-8">
                  <AvatarImage src={event.host.image} />
                  <AvatarFallback>{event.host.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <p className="text-xs desktop:text-sm text-muted-foreground">
                  {event.host.name}
                </p>
              </div>
              <div className="h-5 border-r border-gray-300" />
              <p className="text-xs desktop:text-sm text-muted-foreground">
                120K lượt theo dôi
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="size-4" />
                <p className="text-xs desktop:text-sm">
                  Chủ nhật, Th 09 15, 2024
                </p>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="size-4" />
                <p className="text-xs desktop:text-sm">8:00 PM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        <Button
          className="rounded-lg"
          variant={event.isSubcrible ? "outline" : "default"}
        >
          {event.isSubcrible && <Check className="size-6 text-primary" />}{" "}
          {!event.isSubcrible ? "Đăng ký" : "Đã đăng ký"}
        </Button>
      </div>
    </CarouselItem>
  ));
  return (
    <Carousel>
      <CarouselContent>{items}</CarouselContent>
      <CarouselPrevious className="-left-4 text-primary" />
      <CarouselNext className="-right-4 text-primary" />
    </Carousel>
  );
};

export default CarouselEvent;
