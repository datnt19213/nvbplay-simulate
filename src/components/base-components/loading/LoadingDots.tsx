const LoadingDots = ({ size = "text-4xl", color = "text-blue-600" }) => {
  return (
    <div className="flex items-center space-x-1 mx-auto">
      <span
        className={`${size} ${color} animate-bounce [animation-delay:-0.3s]`}
      >
        •
      </span>
      <span
        className={`${size} ${color} animate-bounce [animation-delay:-0.15s]`}
      >
        •
      </span>
      <span className={`${size} ${color} animate-bounce`}>•</span>
    </div>
  );
};

export default LoadingDots;
