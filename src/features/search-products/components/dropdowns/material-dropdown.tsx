"use client";

interface IProps {
  title: string;
}

const MaterialDropdown: React.FC<IProps> = ({ title }) => {
  // const { dispatchItem, handleSelect, selectedItems } =
  //   useSearchFilter("selectedMaterials");
  // const { isMobile } = useMediaQueryScreen();

  // const onClick = (item: string) => {
  //   handleSelect(item);
  //   if (!isMobile) dispatchItem(item);
  // };

  // const items = [
  //   {
  //     title: "Carbon",
  //   },
  //   {
  //     title: "Nhôm",
  //   },
  //   {
  //     title: "Gỗ",
  //   },
  // ];

  // return (
  //   <BaseDropdown title={title}>
  //     <div className="grid grid-cols-2 gap-[8px]">
  //       {items.map((i, index) => (
  //         <TagCheckbox
  //           title={i.title}
  //           isChecked={selectedItems.indexOf(i.title) !== -1}
  //           onClick={() => onClick(i.title)}
  //           key={index}
  //         />
  //       ))}
  //     </div>
  //   </BaseDropdown>
  // );
  return <></>;
};

export default MaterialDropdown;
