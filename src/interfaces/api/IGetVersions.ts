import { IExtension } from "./IExtension";

export interface IRequestBody {
  extension: string;
}

export interface IVersionFile {
  assetType: string;
  source: string;
}

export interface IVersion {
  version: string;
  files: IVersionFile[];
}

export interface IApiResponse {
  results: {
    extensions: IExtension[];
  }[];
}
