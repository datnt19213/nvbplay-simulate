// "use client";

// import { Icon } from "@/components/common-components";
// import { setSearchKeyword, setShowSearch } from "@/stores/search-slice";
// import { History } from "lucide-react";
// // import { COMMON_DATA } from "@/configs";
// import React, { FC } from "react";
// import { useDispatch } from "react-redux";
// import { useLocalStorage } from "usehooks-ts";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

// type SearchHistoryProps = {
//   type: "wait" | "onseach";
// };



// const SearchHistory: FC<SearchHistoryProps> = ({ type = "wait" }) => {
//   const router = useRouter();

//   // Redux
//   const dispatch = useDispatch();

//   // Hooks
//   const [historySearch, setHistorySearch] = useLocalStorage<
//     HistorySearchType[]
//   >("historySearch", []);

//   // Logic
//   const handleDeleteHistorySearch = (searchKeyword: string) => {
//     const newHistorySearch = historySearch.filter(
//       (item: HistorySearchType) => item.keyword !== searchKeyword
//     );
//     setHistorySearch(newHistorySearch as never[]);
//   };

//   const handleDeleteAllHistorySearch = () => {
//     setHistorySearch([]);
//   };

//   const handleClickHistorySearch = (searchHistory: HistorySearchType) => {
//     dispatch(setShowSearch(false));
//     dispatch(setSearchKeyword(searchHistory.keyword));

//     if (searchHistory.type === "product") {
//       router.push(`/product/${searchHistory.slug}`);
//     } else {
//       Cookies.set("searchProduct", searchHistory.keyword, { expires: 365 });
//       router.push(`/products`);
//     }
//   };

//   return (
//     <div className="flex flex-col w-full gap-3">
//       <div className="w-full flex justify-between items-center">
//         <span className="text-primary font-semibold">Lịch sử tìm kiếm</span>
//         <span
//           className="font-semibold text-red-primary text-sm cursor-pointer"
//           onClick={handleDeleteAllHistorySearch}
//         >
//           Xoá tất cà
//         </span>
//       </div>
//       {historySearch?.length == 0 ? (
//         <>
//           <div className="flex flex-col justify-center items-center h-full">
//             <History className="size-5 text-gray-icon" />
//             <p className="text-sm text-gray-500">
//               Không tìm thấy lịch sử tìm kiếm nào
//             </p>
//           </div>
//         </>
//       ) : (
//         <>
//           {historySearch
//             ?.slice()
//             ?.reverse()
//             ?.map((searchHistory, index) => (
//               <SearchHistoryItem
//                 type={type}
//                 key={index}
//                 name={searchHistory.keyword}
//                 deleteHistory={handleDeleteHistorySearch}
//                 onClick={() => handleClickHistorySearch(searchHistory)}
//               />
//             ))}

//           <span className="text-txtfourth text-sm font-semibold cursor-pointer mx-auto">
//             Xem thêm
//           </span>
//         </>
//       )}
//     </div>
//   );
// };

// export default SearchHistory;

// type SearchHistoryItemProps = {
//   name: string;
//   deleteHistory: (searchKeyword: string) => void;
//   onClick: () => void;
// } & SearchHistoryProps;
// const SearchHistoryItem: FC<SearchHistoryItemProps> = ({
//   name,
//   type,
//   deleteHistory,
//   onClick,
// }) => {
//   return (
//     <div className="flex justify-between min-h-6 gap-2">
//       <div className="flex items-center gap-[15px]" onClick={onClick}>
//         <Icon
//           icon="ph:clock-clockwise"
//           className="rotate-90 text-gray-icon"
//           fontSize={20}
//         />
//         <span>{name}</span>
//       </div>
//       {type === "wait" && (
//         <Icon
//           icon="ph:x"
//           fontSize={24}
//           className="text-gray-icon cursor-pointer"
//           onClick={() => deleteHistory(name)}
//         />
//       )}
//       {type === "onseach" && (
//         <Icon
//           icon="ph:arrow-up-right"
//           fontSize={24}
//           className="text-gray-icon"
//         />
//       )}
//     </div>
//   );
// };
