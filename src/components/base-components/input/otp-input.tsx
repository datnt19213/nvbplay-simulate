"use client";
import React, {useState, createRef, useEffect, FC} from "react";

type OtpInputProps = {
  length: number;
  onChange?: (otp: string) => void;
  onComplete?: (otp: string) => void;
  className?: string;
  inputClassName?: string;
  focusActive?: boolean;
  focusActiveClass?: string;
};

export const OtpInput: React.FC<OtpInputProps> = ({
  length,
  onChange,
  onComplete,
  className,
  inputClassName,
  focusActive,
  focusActiveClass,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef = Array.from({length}, () => createRef<HTMLInputElement>());

  useEffect(() => {
    onChange && onChange(otp.join(""));

    if (otp.every((value) => value !== "")) {
      onComplete?.(otp.join(""));
    }
  }, [otp, onChange, onComplete]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "") {
        if (index > 0) {
          inputsRef[index - 1]?.current?.focus();
        }
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData("Text").slice(0, length);

    if (/^\d+$/.test(clipboardData)) {
      const newOtp = clipboardData
        .split("")
        .concat(Array(length - clipboardData.length).fill(""));
      setOtp(newOtp);

      inputsRef[length - 1]?.current?.focus();
    }
  };

  return (
    <div className={`flex gap-2 ${className || ""}`}>
      {Array.from({length}).map((_, index) => (
        <input
          key={index}
          ref={inputsRef[index]}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={`w-12 h-12 desktop:w-14 desktop:h-14 text-center border transition-all rounded-lg focus:outline-none ${inputClassName || ""} ${focusActive && focusActiveClass}`}
        />
      ))}
    </div>
  );
};
