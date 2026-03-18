import {ENUM} from "@/configs";
import {getUserData} from "@/services/users";
import {useQuery} from "@tanstack/react-query";
import React from "react";

export const useQueryGetUser = () => {
  const query = useQuery({
    queryKey: [ENUM.QK_USERS],
    queryFn: () => getUserData(),
  });
  return {data: query.data, query: query};
};
