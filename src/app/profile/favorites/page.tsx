import FavoriteProducts from "@/features/favorite-products";
import React from "react";

const Favorites = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <FavoriteProducts />
    </div>
  );
};

export default Favorites;
