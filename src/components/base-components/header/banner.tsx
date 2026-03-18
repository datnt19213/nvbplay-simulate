const Banner = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-[#6FE3E1] to-[#5257E5] h-[2.25rem]">
      <div className="relative h-full flex items-center justify-center text-sm font-semibold leading-5 text-white">
        NVB Play Vacation Dream {new Date().getFullYear()}
        <img
          className="absolute -right-20 w-[7.9375rem] h-full"
          src={"/icons/nvbplay_vector.svg"}
          alt="vector_logo"
        />
      </div>
    </div>
  );
};

export default Banner;
