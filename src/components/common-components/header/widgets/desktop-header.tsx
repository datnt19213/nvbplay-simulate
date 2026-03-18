import MegaMenu from "../widgets/mega-menu";
import Navigation from "../widgets/navigation";
import Banner from "./banner";

export const DesktopHeader = () => {
  return (
    <div className="flex flex-col w-full bg-white">
      <Banner />
      <Navigation />
      <MegaMenu />
    </div>
  );
};
