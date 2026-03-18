import Banner from "./banner";
import Navigation from "./navigation";
import MegaMenu from "./mega-menu";

type HeaderProps = {
  onlyBanner?: boolean;
  isSearch?: boolean;
};
const Header = ({isSearch = false, onlyBanner = false}: HeaderProps) => {
  return (
    <header className="w-full sticky top-0 bg-white z-50">
      <div className="flex flex-col w-full">
        {!onlyBanner ? (
          <>
            {/* BANNER */}
            <Banner />
            {/* NAVIGATION */}
            <Navigation />
            {/* MEGA MENU - SEARCH - USERBUTTON - CART */}
            <MegaMenu withSearchScroll={isSearch} />
          </>
        ) : (
          <>
            {/* BANNER */}
            <Banner />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
