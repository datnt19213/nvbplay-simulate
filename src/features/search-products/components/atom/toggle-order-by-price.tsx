"use client";

import { cn } from "@/lib/utils";
import { OrderByEnum, setSelectedSort } from "@/stores/search-slice";
import { Dot, MoveDown, MoveUp } from "lucide-react"; // Optional icons
import { useState } from "react";
import { useDispatch } from "react-redux";

const ToggleOrderByPrice = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<"asc" | "desc" | "idle">("idle");

  const toggleState = () => {
    const nextState =
      state === "idle" ? "asc" : state === "asc" ? "desc" : "idle";
    setState(nextState);
    if (nextState === "asc")
      return dispatch(setSelectedSort(OrderByEnum.PRICE_ASC));
    if (nextState === "desc")
      return dispatch(setSelectedSort(OrderByEnum.PRICE_DESC));
    return dispatch(setSelectedSort(undefined));
  };

  return (
    <button
      onClick={toggleState}
      className={cn(
        `flex items-center gap-2`,
        state !== "idle" && "text-primary"
      )}
    >
      <span className="text-primary">Giá</span>
      {state === "asc" && <MoveUp size={12} className="text-primary" />}
      {state === "desc" && <MoveDown size={12} className="text-primary" />}
      {state === "idle" && <MoveUp size={12} className="text-primary" />}
    </button>
  );
};

export default ToggleOrderByPrice;
