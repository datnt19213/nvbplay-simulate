"use client";
import {ButtonSubmitPrimary} from "@/components/base-components/buttons";
import AddressesSkeleton from "@/components/base-components/skeletons/addresses-skeleton";
import {useQueryGetAllAddreses} from "@/hooks/queries/addresses";
import {Plus} from "lucide-react";
import React, {HTMLAttributes, useState} from "react";
import {EditButton} from "./components/edit-button";
import {RemoveButton} from "./components/remove-button";
import TimeoutAction from "@/components/particals/timeout";
import EmptyItem from "@/components/base-components/cta/empty-item";
import {AddressEmpty} from "@/assets/images";
import {translate} from "@/utilities/translator";
import {AddressTagItem} from "../profile/components/address-list";
import {sortByDefaultShipping} from "@/utilities/sorts";
import {setAddressModal} from "@/stores/profile";
import {useDispatch} from "react-redux";

const Addreses = () => {
  const {data, query, hasMore, loadMore, isLoadMore} = useQueryGetAllAddreses();
  const dispatch = useDispatch();

  if (!query.isSuccess) {
    return (
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-3">
        {Array.from({length: 4}).map((_, index) => (
          <TimeoutAction
            key={index}
            onTickComponent={<AddressesSkeleton key={index} />}
            loading={!query.isSuccess}
            onEndComponent={
              <>
                {index === 0 && (
                  <EmptyItem
                    className="col-span-1 desktop:col-span-2"
                    image={AddressEmpty.src}
                    title={translate("address_list_is_empty")}
                    isNavigable={false}
                    actionButton={
                      <ButtonSubmitPrimary
                        className="w-fit flex items-center gap-3 desktop:hidden"
                        onClickHandle={() => {}}
                      >
                        <Plus className="h-6 w-6 text-white" />
                        {translate("add_new_address")}
                      </ButtonSubmitPrimary>
                    }
                  />
                )}
              </>
            }
          />
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-3">
        {data?.length > 0 &&
          sortByDefaultShipping(data)?.map((item: any, index: number) => (
            <AddressItem
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              key={item.id}
              data={item}
            />
          ))}
      </div>
      {isLoadMore &&
        Array.from({length: 4}).map((_, index) => (
          <TimeoutAction
            key={index}
            onTickComponent={<AddressesSkeleton key={index} />}
            loading={true}
            onEndComponent={<></>}
          />
        ))}
      {hasMore && (
        <ButtonSubmitPrimary
          className="flex gap-2 w-fit bg-transparent border border-txtthird text-txtthird hover:bg-transparent mx-auto"
          onClickHandle={loadMore}
          loading={query.isFetching}
        >
          {translate("load_more")}
        </ButtonSubmitPrimary>
      )}
      <ButtonSubmitPrimary
        className="flex gap-2 w-fit"
        onClickHandle={() => dispatch(setAddressModal(true))}
      >
        <Plus size={24} />
        <span>{translate("add_new_address")}</span>
      </ButtonSubmitPrimary>
    </>
  );
};

export default Addreses;

export const AddressItem = ({
  data,
  ...props
}: {data: any} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className="p-4 bg-white rounded-lg flex flex-col justify-between animate-fade-up"
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="font-semibold flex items-center text-txtfifth gap-3">
            <p className="max-w-[150px] overflow-x-hidden truncate">
              {data.first_name}
            </p>
            <hr className="h-5 w-[1px] bg-gray-border text-gray-icon" />
            <span className="font-medium">{data.phone}</span>
          </div>
          <EditButton data={data} />
        </div>
        <p className="text-sm font-medium text-gray-icon">
          {data.address_1 && `${data.address_1 + ","}`}{" "}
          {data.province && `${data.province + ","}`} {data.city}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {data?.is_default_shipping && (
            <AddressTagItem
              background="#FFF0F1"
              color="#D93843"
              name="Mặc định"
            />
          )}
          {data.metadata?.type && (
            <AddressTagItem
              className={
                data.metadata?.type === "house"
                  ? "text-txtthird bg-red-sencondary hover:bg-red-sencondary"
                  : "text-txtfourth bg-blue-secondary hover:bg-blue-secondary"
              }
              name={data.metadata?.type === "house" ? "Nhà riêng" : "Công ty"}
            />
          )}
        </div>

        <RemoveButton id={data.id} />
      </div>
    </div>
  );
};
