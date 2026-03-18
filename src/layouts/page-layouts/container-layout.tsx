import {GlobalLayoutProps} from "@/types";
const ContainerLayout = ({children}: GlobalLayoutProps) => {
  return (
    <main className="flex flex-col gap-10 py-6 bg-[#f5f5fa] overflow-hidden px-5 desktop:px-0">
      {children}
    </main>
  );
};

export default ContainerLayout;
