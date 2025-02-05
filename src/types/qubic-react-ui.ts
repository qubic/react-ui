import { ReactNode, SVGProps } from 'react';

export interface InputMaxCharsProps {
  id: string;
  label: string;
  max: number;
  placeholder: string;
  onChange: (value: string) => void;
}

export interface InputNumbersProps {
  label: string;
  placeholder: string;
  onChange: (value: number) => void;
}

export interface ButtonProps {
  label: string;
  primary?: boolean;
  onClick: () => void;
}

export interface DropdownOption {
  label: string;
}

export interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selected: number;
  setSelected: (index: number) => void;
}

export interface ConfirmTxModalProps {
  open: boolean;
  onClose: () => void;
  tx: {
    title: string;
    description: string;
  };
  onConfirm: () => Promise<any>;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export interface HeaderProps {
  logo: string;
}

export interface TickInfoType {
  tick: number;
  epoch: number;
}

export interface BalanceInfo {
  balance: {
    balance: number;
  };
}

export interface ProductLogoProps {
  name: string; // name of your Qubic product
  className?: string;
}

declare const QubicConnectProvider: React.FC<{ children: ReactNode }>;
declare const Header: React.FC<HeaderProps>;
declare const Card: React.FC<CardProps>;
declare const Button: React.FC<ButtonProps>;
declare const InputMaxChars: React.FC<InputMaxCharsProps>;
declare const InputNumbers: React.FC<InputNumbersProps>;
declare const ConfirmTxModal: React.FC<ConfirmTxModalProps>;
declare const Dropdown: React.FC<DropdownProps>;
declare const ProductLogo: React.FC<ProductLogoProps>;

export interface IconsType {
  CopyElement: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  ArrowDown: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

declare const Icons: IconsType;

export {
  QubicConnectProvider,
  Header,
  Card,
  Button,
  InputMaxChars,
  InputNumbers,
  ConfirmTxModal,
  Dropdown,
  Icons,
  ProductLogo,
};

declare function useQubicConnect(): {
  connected: boolean;
  getPaymentTx: (sender: string, receiver: string, amount: number, targetTick: number) => Promise<any>;
  getSignedTx: (tx: any, offset: number) => Promise<any>;
  broadcastTx: (tx: any) => Promise<any>;
  getMetaMaskPublicId: (index?: number) => Promise<string>;
  getTickInfo: () => Promise<TickInfoType>;
  getBalance: (publicId: string) => Promise<BalanceInfo>;
  tickOffset: number;
};

declare function isAddressValid(address: string): boolean;
declare function isAmountValid(amount: number): boolean;
declare function truncateMiddle(str: string, maxLength: number): string;

export {
  useQubicConnect,
  isAddressValid,
  isAmountValid,
  truncateMiddle
};
