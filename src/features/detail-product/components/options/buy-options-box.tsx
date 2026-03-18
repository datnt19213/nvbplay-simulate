import { FormatCurrency } from "@/utilities/text";
import { Icon } from "@iconify-icon/react";
import NVBCoinBox from "../atom/nvb-coin-box";

interface IProps {
  showPrice?: boolean;
}

const BuyOptionsBox: React.FC<IProps> = ({ showPrice = false }) => {
  const items = [
    {
      icon: <Icon icon="mdi-light:credit-card" width="24" height="24" />,
      label: "Trả góp đặt trước",
      description: "Trả góp chỉ từ 99.000 đ khi đặt trước.",
    },
    {
      icon: <Icon icon="mdi-light:credit-card" width="24" height="24" />,
      label: "Trả góp đặt trước",
      description: "Trả góp chỉ từ 99.000 đ khi đặt trước.",
    },
    {
      icon: <Icon icon="mdi-light:credit-card" width="24" height="24" />,
      label: "Trả góp đặt trước",
      description: "Trả góp chỉ từ 99.000 đ khi đặt trước.",
    },
  ];

  return (
    <div className="md:w-[297px] w-full p-[8px] rounded-[16px] text-sm">
      {items.map((item) => (
        <div
          className="flex p-[8px] gap-[8px] hover:bg-gray-200 cursor-pointer"
          key={item.label}
        >
          <div>{item.icon}</div>
          <div>
            <div className="font-[600] text-txtfifth">{item.label}</div>
            <div className="font-[500] text-[11px] leading-[16.5px] text-txtsecondary">
              {item.description}
            </div>
          </div>
        </div>
      ))}
      {showPrice && (
        <div className="flex justify-between w-full px-[16px] py-[6px]">
          <NVBCoinBox />
          <span className="text-txtthird text-[18px] leading-[27px] font-[700]">
            {FormatCurrency(1350000)}
          </span>
        </div>
      )}
    </div>
  );
};

export default BuyOptionsBox;
