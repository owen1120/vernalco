import { ReactNode } from 'react';

// 定義所有型錄的分類 ID
export type CatalogCategory = 
  | 'accessories' 
  | 'machineryParts' 
  | 'erColletChuck' 
  | 'star'
  | 'citizenCincom'
  | 'nomuraDs'
  | 'tsugami';

export interface MatrixRowDef<T> {
  label: string; 
  labelClassName?: string;
  valueClassName?: string; 
  render: (item: T) => ReactNode; 
}


// 1. 配件 (Accessories)
export interface AccessoryItem {
  sku: string;
  drawingNo: string;
  valuationSerialNum: string;
  title: string;
  titleZhTw: string;
  imgUrl: string;
  productSpecifications: string[];
  status: string;
}

// 2. 機械零件 (Machinery Parts)
export interface MachineryPartItem {
  sku: string;
  title: string;
  titleZhTw: string;
  imgUrl: string;
  refNo: string;
  drawingNo: string;
  valuationSerialNum: string;
  brand: string;
  processingStroke: string;
  matchingMachineTools: string[];
  pat: string;
  status: string;
}

// 3. ER 筒夾 (ER Collet Chuck)
export interface ErColletChuckItem {
  sku: string;
  drawingNo: string;
  valuationSerialNum: string;
  endedType: string;
  colletType: string;
  overallDimensions: string;
  imgUrl: string;
  status: string;
}

// 4. 機型共用結構 (Star, CitizenCincom, NomuraDs, Tsugami)
export interface MachineItem {
  sku: string;
  title: string;
  titleZhTw: string;
  imgUrl: string;
  refNo: string;
  drawingNo: string;
  valuationSerialNum: string;
  spindlePosition: string[];
  handle: string;
  clampingMethod: string;
  cuttingTools: string;
  speedRatio: string;
  maxRpm: string;
  lengthPerRef: string;
  adjustableSpindle: string;
  adjustableAngle: string;
  matchingMachineTools: {
    mainSpindle: string[];
    subSpindle: string[];
  };
  specialNote: string[];
  status: string;
}