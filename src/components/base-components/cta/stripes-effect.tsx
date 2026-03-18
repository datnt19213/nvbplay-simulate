type GradientPatternProps = {
  angle?: number;
  primaryColor?: string;
  secondaryColor?: string;
  primaryThickness?: string;
  secondaryThickness?: string;
  className?: string;
};

export const GradientPattern: React.FC<GradientPatternProps> = ({
  angle = 135,
  primaryColor = "#a22215",
  secondaryColor = "#a22215aa",
  primaryThickness = "0.5rem",
  secondaryThickness = "0.5rem",
  className = "",
}) => {
  const backgroundStyle = {
    background: `repeating-linear-gradient(
        ${angle}deg, 
        ${primaryColor} 0, 
        ${primaryColor} ${primaryThickness}, 
        ${secondaryColor} ${primaryThickness}, 
        ${secondaryColor} calc(${primaryThickness} + ${secondaryThickness})
      )`,
  };

  return (
    <div className={`w-full h-full ${className}`} style={backgroundStyle} />
  );
};

// original
{
  /* <defs>
          <pattern
            id={patternA.id}
            patternUnits="userSpaceOnUse"
            width={patternA.rectWidth}
            height={
              patternA.primaryHeight &&
              patternA.secondaryHeight &&
              patternA.primaryHeight + patternA.secondaryHeight
            }
            patternTransform={`rotate(${patternA.patternRotation})`}
          >
            <rect
              width={patternA.rectWidth}
              height={patternA.primaryHeight}
              fill={patternA.primaryColor}
            />
            <rect
              y={patternA.primaryHeight}
              width={patternA.rectWidth}
              height={patternA.secondaryHeight}
              fill={patternA.secondaryColor}
            />
          </pattern>
        </defs> */
}
