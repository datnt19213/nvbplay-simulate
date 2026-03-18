import SearchAndFilter from "./components/filters";
import { MainContent } from "./components/main-content";
import { HomeNavigation } from "./components/navigation";
import { Stories } from "./components/stories/stories";

export const HomePageFeature = async () => {
  return (
    <div className="container px-3 md:px-0 overflow-hidden py-8">
      {/* <HomeNavigation /> */}
      <SearchAndFilter />
      <Stories />
      <MainContent />
    </div>
  );
};

export default HomePageFeature;
