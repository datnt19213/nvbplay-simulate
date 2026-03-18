import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

const searchTrending = [
  "Pickleball",
  "Áo cầu lông",
  "Vợt cầu lông",
  "Bóng cầu lông",
  "Bóng chuyền",
  "Bóng đá",
  "Bóng rổ",
  "Bóng bầu dục",
  "Bóng chày",
  "Bóng đá bóng chuyền",
];

const TrendingSearch = () => {
  return (
    <div className="flex flex-col gap-2 py-1.5 px-4">
      <div className="flex items-center justify-between py-1.5">
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="p-1 bg-gradient-to-b from-primary to-primary/50 size-5 rounded-md"
          >
            <TrendingUp className="size-4 text-white" />
          </Button>
          <h3 className="text-base font-semibold">Xu hướng tìm kiếm</h3>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {searchTrending.map((item, index) => (
          <Button
            key={index}
            variant="secondary"
            className="text-muted-foreground rounded-full"
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TrendingSearch;
