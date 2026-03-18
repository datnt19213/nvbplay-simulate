import { ButtonCategoryListItem } from "@/components/base-components/buttons";
import Bounded from "@/components/base-components/containers/bounded";
import { Icon } from "@/components/common-components";
import { COMMON_DATA } from "@/configs";
import { ListQuestion } from "./list-question";

export const RecentlyQuestions = () => {
  return (
    <Bounded className="bg-white rounded-lg">
      <div className="p-4 mt-4 ">
        <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
          <h3 className="text-xl text-neutral-700 font-semibold">
            Câu hỏi thường gặp
          </h3>
          <div className="flex items-center overflow-x-scroll scrollbar-none w-full desktop:w-fit">
            <div className="flex items-center gap-2">
              <ButtonCategoryListItem>Tất cả</ButtonCategoryListItem>
              {COMMON_DATA.categories.map((category, index) => {
                if (index <= 2) {
                  return (
                    <ButtonCategoryListItem key={index}>
                      {category.name}
                    </ButtonCategoryListItem>
                  );
                }
              })}
              <div className="rounded-full bg-gray-primary text-gray-icon aspect-square h-10 w-10 flex items-center justify-center">
                <Icon icon="ph:dots-three" fontSize={20} />
              </div>
              {/* {
                <Popover>
                  <PopoverTrigger className="rounded-full bg-gray-primary text-gray-icon aspect-square h-10 w-10 flex items-center justify-center">
                    <Icon icon="ph:dots-three" fontSize={20} />
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-2 bg-white shadow-lg p-6 rounded-xl">
                    {COMMON_DATA.categories.map((category, index) => {
                      if (index > 2) {
                        return (
                          <ButtonCategoryListItem
                            // active={currentCategory === category.value}
                            className="!w-full bg-white hover:bg-white"
                            key={index}
                            // onClick={() =>
                            //   dispatch(setCurrentCategory(category.value))
                            // }
                          >
                            {category.name}
                          </ButtonCategoryListItem>
                        );
                      }
                    })}
                  </PopoverContent>
                </Popover>
              } */}
            </div>
          </div>
        </div>

        <ListQuestion />
      </div>
    </Bounded>
  );
};
