import React, {FC, ReactNode} from "react";

type PersonalLayoutProps = {
  children: ReactNode;
};
const PersonalLayout: FC<PersonalLayoutProps> = ({children}) => {
  return (
    <div className="w-full flex flex-col gap-6 px-4 py-5 rounded-lg bg-white">
      {children}
    </div>
  );
};

export default PersonalLayout;
