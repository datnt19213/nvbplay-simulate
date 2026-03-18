import { Logo } from "@/assets/images";
import Image from "@/components/base-components/images/image";
import IconCustom from "@/components/common-components/icon-custom";
import { Skeleton } from "@/components/ui/skeleton";
import { FormatCurrency } from "@/utilities/text";

const DetailProducts = ({
  order,
  isLoading,
}: {
  order: any;
  isLoading: boolean;
}) => {
  return (
    <div className="w-full flex flex-col gap-5 p-2 rounded-lg bg-white">
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg leading-6">Chi tiết đơn hàng</h2>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center text-sm font-semibold text-gray-fifth">
            <img
              src={Logo.src}
              alt="logo"
              className="rounded-full h-7 w-7 aspect-square"
            />
            <span>NVB Play</span>
          </div>
          <div className="flex gap-2 items-center font-semibold text-sm text-gray-icon">
            <IconCustom icon="ph:chat-circle-dots" fontSize={24} />
            <span>Nhắn tin</span>
          </div>
        </div>
        <div className="p-2 flex flex-col w-full gap-8">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {order?.items.length > 0 ? (
                <>
                  {order?.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={item?.thumbnail ? item.thumbnail : undefined}
                          alt="product_image"
                          className="rounded-lg border border-gray-200 !size-20 flex items-center justify-center"
                          classNameImage="size-[68px]"
                        />
                        <div className="flex flex-col items-start gap-1">
                          <p className="text-sm font-medium leading-5">
                            {item.product_title}
                          </p>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-muted-foreground">
                              {item.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="hidden lg:block text-sm font-medium">
                              {FormatCurrency(item.unit_price)}
                            </p>
                            <div className="border border-r h-3 hidden lg:block"></div>
                            <p className="text-sm text-muted-foreground">
                              x{item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-end mt-auto md:mt-0 gap-1">
                        <p className="text-base font-semibold">
                          {FormatCurrency(item.unit_price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center">
                    <IconCustom icon="lucide:info" fontSize={24} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="p-2 flex justify-between lg:justify-end border-t rounded-lg border-gray-border gap-2">
          <span className="font-medium text-[#64646D]">
            Tạm tính ({order?.items.length} sản phẩm):
          </span>
          <span className="font-semibold text-txtprimary">
            {FormatCurrency(order?.original_item_total || 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailProducts;
