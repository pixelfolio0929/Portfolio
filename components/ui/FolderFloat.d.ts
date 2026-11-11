import type { FC, ReactNode, CSSProperties } from 'react';

export interface FolderFloatItem {
  label: string;
  value: string;
}

export interface FolderFloatProps {
  items?: Array<string | FolderFloatItem>;
  label?: string;
  sublabel?: string;
  children?: ReactNode;
  trigger?: 'hover' | 'click';
  defaultOpen?: boolean;
  open?: boolean;
  closeOnSelect?: boolean;
  physics?: boolean;
  drift?: number;
  onSelect?: (value: string, index: number) => void;
  onOpenChange?: (open: boolean) => void;
  folderColor?: string;
  frontColor?: string;
  paperColor?: string;
  itemColor?: string;
  itemTextColor?: string;
  labelColor?: string;
  width?: number | string;
  height?: number | string;
  radius?: number;
  spread?: number;
  lift?: number;
  tilt?: number;
  flapAngle?: number;
  restAngle?: number;
  openDuration?: number;
  stagger?: number;
  bounce?: number;
  className?: string;
  style?: CSSProperties;
}

declare const FolderFloat: FC<FolderFloatProps>;
export default FolderFloat;
