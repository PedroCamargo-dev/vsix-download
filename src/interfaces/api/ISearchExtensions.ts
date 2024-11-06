import { IExtension } from "./IExtension";

export interface IExtensionQueryResponse {
  results: {
    extensions: IExtension[];
  }[];
}

export interface ISuggestion {
  name: string;
  id: string;
  iconUrl?: string;
}
