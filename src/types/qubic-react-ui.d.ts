declare module '@qubic/react-ui' {
  import { ReactNode } from 'react';

  export interface InputMaxCharsProps {
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

  export const QubicConnectProvider: React.FC<{ children: ReactNode }>;
  export const Header: React.FC<HeaderProps>;
  export const Card: React.FC<CardProps>;
  export const Button: React.FC<ButtonProps>;
  export const InputMaxChars: React.FC<InputMaxCharsProps>;
  export const InputNumbers: React.FC<InputNumbersProps>;
  export const ConfirmTxModal: React.FC<ConfirmTxModalProps>;
  export const Dropdown: React.FC<DropdownProps>;

  export function useQubicConnect(): {
    connected: boolean;
    getPaymentTx: (sender: string, receiver: string, amount: number, targetTick: number) => Promise<any>;
    getSignedTx: (tx: any, offset: number) => Promise<any>;
    broadcastTx: (tx: any) => Promise<any>;
    getMetaMaskPublicId: (index?: number) => Promise<string>;
    getTickInfo: () => Promise<TickInfoType>;
    getBalance: (publicId: string) => Promise<BalanceInfo>;
    tickOffset: number;
  };

  export function isAddressValid(address: string): boolean;
  export function isAmountValid(amount: number): boolean;
  export function truncateMiddle(str: string, maxLength: number): string;
}
