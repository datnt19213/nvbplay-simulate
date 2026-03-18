"use client";

interface IProps {
  title: string;
}

const ColorDropdown: React.FC<IProps> = ({ title }) => {
  // const { dispatchItem, handleSelect, selectedItems } =
  //   useSearchFilter("selectedColors");
  // const { isMobile } = useMediaQueryScreen();

  // const onClick = (item: string) => {
  //   handleSelect(item);
  //   if (!isMobile) dispatchItem(item);
  // };
  // const colors = [
  //   {
  //     title: "red",
  //   },
  //   {
  //     title: "blue",
  //   },
  //   {
  //     title: "green",
  //   },
  //   {
  //     title: "yellow",
  //   },
  // ];
  // return (
  //   <BaseDropdown title={title}>
  //     <div className="flex flex-wrap items-center gap-[8px]">
  //       {colors?.map((color, index) => (
  //         <ColorPalette
  //           key={index}
  //           colors={[color.title]}
  //           active={selectedItems.includes(color.title)}
  //           onClick={() => onClick(color.title)}
  //         />
  //       ))}
  //     </div>
  //   </BaseDropdown>
  // );
  return <></>;
};

export default ColorDropdown;
