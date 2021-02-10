import * as vscode from "vscode";

import { ColorsCollection } from "./data/scripts/getColors";

export const saveDataToJSON = async (
  context: vscode.ExtensionContext,
  type: string,
  data: ColorsCollection
): Promise<void> => {
  const writeData = Buffer.from(JSON.stringify(data), "utf8");
  const writePath = vscode.Uri.joinPath(
    context.globalStorageUri,
    `${type}.json`
  );
  try {
    await vscode.workspace.fs.writeFile(writePath, writeData);
    vscode.window.showInformationMessage(`Neverland: Saved ${type} data.`);
  } catch (error) {
    vscode.window.showErrorMessage(`Neverland: Could not write data.`);
    console.error(error);
  }
};

export const readDataFromJSON = async (
  context: vscode.ExtensionContext,
  type: string
): Promise<ColorsCollection | void> => {
  const readPath = vscode.Uri.joinPath(
    context.globalStorageUri,
    `${type}.json`
  );
  try {
    const data = JSON.stringify(await vscode.workspace.fs.readFile(readPath));
    return JSON.parse(data);
  } catch (error) {
    vscode.window.showErrorMessage(`Neverland: Could not read data.`);
    console.error(error);
  }
};
