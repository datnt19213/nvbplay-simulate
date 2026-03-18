import Image from "@/components/base-components/images/image";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUpIcon,
  XIcon,
} from "lucide-react";

const mockupImage = [
  {
    image:
      "https://s3-alpha-sig.figma.com/img/1b9d/a9ad/99b0be55f1a61c255b272e54b3ba26ab?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MZa0DaC9WggafIh9JHQ4TtjR-iw7vPJD0HBUK-cBtjk3AkAoh1cwVHtA~wSrUC40W-ScW8GkxumhCmtOOjBLn5Xpuu8E3-ztKQMiUUM7LXDCbAUXziE~8XfR0tqG96io-wupeTjV6SK~Qs7xCOyLhvcPQyEYhpSfjiCvhnajqtbhIh9gdZxYREj-Ra5P4RQ2tVLCix3mwopCTHAZ1raFztiNI9X5XmY~p3DTtoxqzLQV6ktCgtq5xSqr2tSpUnSERQRncHET5RCwb~rU-OUnD8bIt8DIKC~lL~kKLCXAiMRiTh2mwMu-NyK0v8utnvOdqaP08aWS~rt49ugiIV7sLQ__",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/212d/fa1d/562f53ebe429f4f610553fa35b4931de?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oJAHShiqu-owkj3ZyIcIZa6ahfdeGA5ZLuo6kw33OfpHv3vMCzh6QKyASjXQm92oGM-EzlPHqZCnpRBRzih3N3As0tLWfRtE7QYVvZmJYyFghrO6YhhUHpM-E0gylK1750pVLp-adK6-KTbugmI0J6dFTb58kWjAEiNPfl~ko-e7VXnwn5ZIFqrQwL7Rm-3xjOK9uCBqHcbNWV1JPifJrrO-Bt-PuiTlljXZ9wLJue0GTEkw5sFlQSd3W4SApZPOr6hlLntSSSSYa2BEmW3K~xUS5-STl51eHUAH~mjkzxdhOdb3FO4qKTd2i7wyxPrS43anpENhzNXubVjEjGH6pA__",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/318c/d6c0/a1e169c3a28044cf10d668e23761333c?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IyneP7Sn6zZv9zt~Sd7yHhiJy9gNNREPBaX4y0ha9hALl155ofwFP3oTskjO-OEYnTN0UGznhPaao2Ug792l2wYheeWKysRFRG5de0YkhL-INyuq3jRne1EIR5O-p8v5hQVtO9wThtZ2JiCAwwD4qc-vvbQs52eQo1~wT9z7QV4xh2LoKEKr6omkHi9mbOe4aXh~-jOLhNW7S0QGZiXa6X4k7fLF2UlyrwVwVjXQ6maalHTqo66uHGB635FTB1AfbVaiHSQckJY5EzF-Na0-NhkoHl3HkhNqQ4C0nZnkbTDX6mgEsnS0~vw56Zf7JP8KjgMYmsjVK7U9Pfd~Dt0fPQ__",
  },
];

export const StoryContentActionControl = () => {
  return (
    <div>
      {/* Close button */}
      <DialogClose asChild>
        <Button
          className="absolute top-8 right-4 md:right-8 bg-white bg-opacity-20 hover:text-black hover:bg-opacity-80 hover:bg-white rounded-full p-2"
          size={"icon"}
        >
          <XIcon className="size-6" />
        </Button>
      </DialogClose>

      {/* Action control */}
      <div className="hidden absolute top-1/2 right-8 -translate-y-1/2 md:flex flex-col items-center justify-center gap-4">
        <Button
          className="bg-white bg-opacity-20 hover:text-black hover:bg-opacity-80 hover:bg-white rounded-full p-2"
          size={"icon"}
        >
          <ChevronUpIcon className="size-6" />
        </Button>
        <Button
          className="bg-white bg-opacity-20 hover:text-black hover:bg-opacity-80 hover:bg-white rounded-full p-2"
          size={"icon"}
        >
          <ChevronDown className="size-6" />
        </Button>
      </div>

      {/* Image list */}
      <div className="absolute bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
        <Button
          className="bg-white bg-opacity-20 hover:text-black hover:bg-opacity-80 hover:bg-white rounded-full p-1 md:p-2 size-7 md:size-12"
          size={"icon"}
        >
          <ChevronLeft className="size-10" />
        </Button>

        <div className="flex justify-center items-center gap-4 mx-2 md:mx-6 overflow-x-scroll scrollbar-none">
          {mockupImage?.map((image, index) => (
            <div
              key={index}
              className="rounded-lg aspect-square border-2 border-[#FF3F1A] overflow-hidden"
            >
              <Image
                src={image.image}
                alt=""
                className="size-7 md:size-10"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <Button
          className="bg-white bg-opacity-20 hover:text-black hover:bg-opacity-80 hover:bg-white rounded-full p-1 md:p-2 size-7 md:size-12"
          size={"icon"}
        >
          <ChevronRight className="size-10" />
        </Button>
      </div>
    </div>
  );
};
