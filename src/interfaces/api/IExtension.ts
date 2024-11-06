import { IVersion } from "./IGetVersions";

export interface IExtension {
  displayName: string;
  publisher: {
    publisherName: string;
  };
  extensionName: string;
  versions: IVersion[];
}
