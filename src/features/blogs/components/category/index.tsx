import { HomeNavigation } from "../home/components/navigation";
import { Stories } from "../home/components/stories/stories";
import { MainContent } from "./components/main-content";

export const BlogCategoryPage = ({ slug }: { slug: string }) => {
  return (
    <div className="container px-3 md:px-0 overflow-hidden">
      <HomeNavigation />
      <Stories />
      <MainContent slug={slug} />
    </div>
  );
};
