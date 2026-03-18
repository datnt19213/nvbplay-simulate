import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  variant?: "primary" | "secondary";
}

const Heading: React.FC<IProps> = ({ title, variant = "primary" }) => {
  return (
    <h2
      className={cn(
        "text-[20px] leading-[30px] font-[600] text-[#38383d]",
        variant === "secondary" && "!text-[18px] !leading-[27px]"
      )}
    >
      {title}
    </h2>
  );
};

export default Heading;
