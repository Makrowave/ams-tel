export type Data = Array<Record> | undefined;
export interface Record {
  key: Number;
  value: string;
}
export type ModelData = Array<ModelRecordData> | undefined;
export interface ModelRecordData {
  modelId: Number;
  productCode?: string;
  eanCode?: string;
  modelName: string;
  frameSize: Number;
  wheelSize: Number;
  manufacturerId: Number;
  price: Number;
  isWoman: boolean;
  isElectric: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  categoryId: Number;
  colorId?: Number;
  bikeCount: Number;
  placeBikeCount: Array<{ placeID: Number; count: Number }>;
}
