"use client";
import { store } from "@/stores";
import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";

type RxProviderProps = {
  children: ReactNode;
};

const RxProvider: FC<RxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}> 
      {children}
    </Provider>
  );
};

export default RxProvider;
