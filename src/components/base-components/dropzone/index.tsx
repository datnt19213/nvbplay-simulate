import {useState, useRef, DragEvent} from "react";

interface DropzoneProps {
  id: string;
  containerClass?: string;
  activeClass?: string;
  inactiveClass?: string;
  onFilesDrop?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  children?: (files: File[]) => React.ReactNode;
}

const Dropzone: React.FC<DropzoneProps> = ({
  id,
  containerClass,
  activeClass = "border-blue-primary border",
  inactiveClass = "bg-gray-primary",
  onFilesDrop,
  accept,
  multiple = false,
  children,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    onFilesDrop?.(selectedFiles);

    event.target.value = "";
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (!event.dataTransfer.files || event.dataTransfer.files.length === 0)
      return;

    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
    onFilesDrop?.(droppedFiles);
  };

  return (
    <div
      className={`rounded-lg flex items-center justify-center cursor-pointer transition-all ${
        isDragging ? activeClass : inactiveClass
      }  ${containerClass}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children?.(files)}
      <input
        ref={inputRef}
        id={id}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Dropzone;
