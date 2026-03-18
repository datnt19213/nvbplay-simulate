import {cn} from "@/lib/utils";
import React, {useState, useEffect, ReactNode} from "react";

/**
 * The `FlyingActionProps` type defines props for a component that handles flying actions in a
 * TypeScript React application.
 * @property {string} activeId - (optional) - The `activeId` property in the `FlyingActionProps` type represents the
 * identifier of the element that is currently active or initiating the flying action.
 * @property {string} targetId - The `targetId` property in the `FlyingActionProps` type represents the
 * unique identifier of the target element or object that the flying action is directed towards. It is
 * optional, meaning it does not have to be provided in every instance of the `FlyingActionProps`
 * object.
 * @property onEffectEnd - The `onEffectEnd` property in the `FlyingActionProps` type is a function
 * that is called when the effect of the flying action ends.
 * @property {number} tick - (optional) - The `tick` property in the `FlyingActionProps` type represents the current
 * tick or time interval of the flying action. It is a number that can be used to track the progress or
 * duration of the action being performed.
 * @property {ReactNode} children - (optional) - The `children` property in the `FlyingActionProps` type represents
 * the child elements that can be passed to the component using this type. These child elements can be
 * of type `ReactNode`, which is a generic type for any React node (e.g., JSX elements, strings,
 * fragments). This
 * @property {string} className - (optional) - The `className` property in the `FlyingActionProps` type is used to
 * specify the CSS class name for styling the component. It allows you to apply custom styles to the
 * component using CSS.
 * @property {ReactNode} actionComponent - The `actionComponent` property in the `FlyingActionProps`
 * type represents a ReactNode that is used to render the visual representation of the flying action.
 * This component will be responsible for displaying the action such as an animation, icon, or any
 * other visual element related to the flying action.
 */
type FlyingActionProps = {
  activeId?: string;
  targetId: string;
  onEffectEnd?: () => void;
  tick?: number;
  children?: ReactNode;
  className?: string;
  actionComponent: ReactNode;
};

const FlyingAction: React.FC<FlyingActionProps> = ({
  activeId,
  targetId,
  onEffectEnd,
  children,
  tick = 1000,
  className,
  actionComponent,
}) => {
  const [isFlying, setIsFlying] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const triggerEffect = () => {
    if (isFlying) return;

    const activeElement = document.getElementById(activeId || "active-fly-btn");
    const targetElement = document.getElementById(targetId);

    if (!activeElement || !targetElement) {
      console.warn("Active or Target element not found.");
      return;
    }

    const activeRect = activeElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    const startX = activeRect.left + activeRect.width / 2;
    const startY = activeRect.top + activeRect.height / 2;
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;

    setStyle({
      position: "absolute",
      left: `${startX}px`,
      top: `${startY}px`,
      transform: `translate(0, 0) scale(1)`,
      transition: "none",
    });

    setIsFlying(true);

    requestAnimationFrame(() => {
      setStyle({
        position: "absolute",
        left: `${endX - 16}px`,
        top: `${endY - 16}px`,
        transform: `translate(0, 0) scale(0.5)`,
        transition: "transform 0.6s ease, left 0.6s ease, top 0.6s ease",
      });
    });

    setTimeout(() => {
      setIsFlying(false);
      onEffectEnd?.();
    }, tick);
  };

  useEffect(() => {
    triggerEffect();
  }, [activeId, targetId]);

  return (
    <>
      <div
        id={`active-fly-${activeId || "btn"}`}
        onClick={triggerEffect}
        style={{pointerEvents: isFlying ? "none" : "auto"}}
      >
        {actionComponent}
      </div>
      {isFlying && (
        <div
          className={cn(
            "absolute bg-white w-8 h-8 rounded-full pointer-events-none animate-fade-move",
            className
          )}
          style={style}
        >
          {children || <div className="p-6 bg-txtthird rounded-full"></div>}
        </div>
      )}
    </>
  );
};

export default FlyingAction;

{
  // sample to use the action
  //
  //   <FlyingAction
  //   activeId="active-id"
  //   targetId="target-id"
  //   actionComponent={
  //     <button id="active-id" className="relative">
  //       send
  //     </button>
  //   }
  // >
  //   <div className="p-6 bg-txtthird rounded-full"></div>
  // </FlyingAction>;
}
