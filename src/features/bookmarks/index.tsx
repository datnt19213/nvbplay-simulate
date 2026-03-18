import React from "react";
import BookmarksGrid from "./components/bookmarks-grid";

interface PickleballCard {
  title: string;
  publisher: string;
  timeAgo: string;
}

const Bookmarks: React.FC = () => {
  const cards: PickleballCard[] = [
    {
      title: "Bí Quyết Chọn Vợt Pickleball: Đơn Giản, Hiệu Quả",
      publisher: "NVB Play",
      timeAgo: "8 giờ trước",
    },
    {
      title: "Bí Quyết Chọn Vợt Pickleball: Đơn Giản, Hiệu Quả",
      publisher: "NVB Play",
      timeAgo: "8 giờ trước",
    },
    {
      title: "Bí Quyết Chọn Vợt Pickleball: Đơn Giản, Hiệu Quả",
      publisher: "NVB Play",
      timeAgo: "8 giờ trước",
    },
    {
      title: "Bí Quyết Chọn Vợt Pickleball: Đơn Giản, Hiệu Quả",
      publisher: "NVB Play",
      timeAgo: "8 giờ trước",
    },
    {
      title: "Bí Quyết Chọn Vợt Pickleball: Đơn Giản, Hiệu Quả",
      publisher: "NVB Play",
      timeAgo: "8 giờ trước",
    },
  ];

  return (
    <div className="w-full text-txtprimary space-y-[12px]">
      <div className="h-[72px] flex items-center justify-center md:justify-start bg-white md:rounded-[8px] p-[16px] w-full">
        <h3 className="text-18-27-600">Bài viết đã lưu (8)</h3>
      </div>
      <BookmarksGrid />
    </div>
  );
};

export default Bookmarks;
