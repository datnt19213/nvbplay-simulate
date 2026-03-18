export interface AddressModalType {
  isOpen: boolean;
  setOpen(value: boolean): void;
  setActiveAddress?: (address: any) => void
}
