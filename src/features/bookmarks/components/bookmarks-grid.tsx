import BookMarkItem from "./bookmark-item";

const BookmarksGrid = () => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-[12px] mx-[8px] md:mx-0">
      {Array.from({ length: 6 }).map((_, index) => (
        <BookMarkItem key={index} />
      ))}
    </div>
  );
};

export default BookmarksGrid;
