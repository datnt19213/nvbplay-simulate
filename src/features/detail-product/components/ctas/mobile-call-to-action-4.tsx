import VariantControllerSheet from "../sheets/variant-controller-sheet";
import CallToAction4 from "./call-to-action-4";

interface IProps {
  className?: string;
  disabled?: boolean;
  hasVariant?: boolean;
}

const MobileCallToAction4: React.FC<IProps> = ({
  className,
  disabled,
  hasVariant = false,
}) => {
  return (
    <>
      {hasVariant ? (
        <CallToAction4
          className={
            "fixed bottom-0 left-0 z-[40] md:hidden px-[16px] py-[8px]"
          }
        />
      ) : (
        <VariantControllerSheet
          type="main-cta4"
          trigger={
            <CallToAction4
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

export default MobileCallToAction4;
