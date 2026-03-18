import React from "react";

const DetailShipping = ({ order }: { order: any }) => {
  return (
    <div className="w-full flex flex-col gap-5 p-4 rounded-lg bg-white">
      <div className="flex flex-col gap-4">
        <h2 className="font-medium leading-6">Thông tin nhận hàng</h2>
        <div className="grid grid-cols-1 gap-2">
          <div className="grid grid-cols-12">
            <div className="col-span-5">
              <p className="text-sm text-muted-foreground leading-5">
                Tên người nhận
              </p>
            </div>
            <div className="col-span-7">
              <p className="text-sm leading-5">
                {order?.shipping_address?.first_name || "Khách"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-5">
              <p className="text-sm text-muted-foreground leading-5">Email</p>
            </div>
            <div className="col-span-7">
              <p className="text-sm leading-5">{order?.email || "-"}</p>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-5">
              <p className="text-sm text-muted-foreground leading-5">
                Số điện thoại
              </p>
            </div>
            <div className="col-span-7">
              <p className="text-sm leading-5">
                {order?.shipping_address?.phone || "-"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-5">
              <p className="text-sm text-muted-foreground leading-5">Địa chỉ</p>
            </div>
            <div className="col-span-7">
              <p className="text-sm leading-5">
                {order?.shipping_address?.address_1 || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailShipping;
