import { Fragment } from "react";
import ToggleOrderByPrice from "../atom/toggle-order-by-price";

const SortCheckbox = () => {
  const items = [
    {
      title: "Nổi bật",
    },
    { title: "dot" },
    {
      title: "Hàng mới",
    },
    { title: "dot" },
    {
      title: "Bán chạy",
    },
    { title: "dot" },
    // {
    //   title: "Giá",
    //   icon: <MoveDown size={15} />,
    // },
  ];

  return (
    <div className="p-[16px] bg-white justify-start flex text-14-21-500 items-center gap-4">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.title === "dot" ? (
            <div className="size-[4px] rounded-full bg-[#a6a6b0]" />
          ) : (
            <button className="flex items-center gap-2">{item.title}</button>
          )}
        </Fragment>
      ))}
      <ToggleOrderByPrice />
    </div>
  );
};

export default SortCheckbox;
