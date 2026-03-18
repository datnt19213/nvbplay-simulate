import VariantControllerSheet from "../sheets/variant-controller-sheet";
import CallToAction3 from "./call-to-action-3";

interface IProps {
  className?: string;
  disabled?: boolean;
  hasVariant?: boolean;
}

const MobileCallToAction3: React.FC<IProps> = ({
  className,
  disabled,
  hasVariant = false,
}) => {
  return (
    <>
      {hasVariant ? (
        <CallToAction3
          className={
            "fixed bottom-0 left-0 z-[40] md:hidden px-[16px] py-[8px]"
          }
        />
      ) : (
        <VariantControllerSheet
          trigger={
            <CallToAction3
              canAction={true}
              className={
                "fixed bottom-0 left-0 z-[40] md:hidden px-[16px] py-[8px]"
              }
            />
          }
        />
      )}
    </>
  );
};

export default MobileCallToAction3;
