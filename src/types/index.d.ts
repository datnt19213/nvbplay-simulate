// _____________GLOBAL COMPONENT_____________
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// _____________GLOBAL LAYOUT_____________

export interface GlobalLayoutProps {
  children: ReactNode;
}
export interface HomeLayoutProps {
  children: ReactNode;
  className?: string;
}

export interface ValueLabelProps {
  id: number;
  label: string;
  value: string;
  [key: string]: any;
}
