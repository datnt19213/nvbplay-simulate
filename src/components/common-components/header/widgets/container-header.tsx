const ContainerHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="w-full sticky top-0 bg-white z-50">{children}</header>
  );
};

export default ContainerHeader;
