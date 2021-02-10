import * as vscode from "vscode";
import { getColorsFromRepo } from "./data/scripts/getColors";
import { saveDataToJSON } from "./util";

export function activate(context: vscode.ExtensionContext): void {
  vscode.commands.registerCommand(
    "jw-neverland-intellisense.helloWorld",
    async () => {
      const colors = await getColorsFromRepo();
      await saveDataToJSON(context, "colors", colors);
    }
  );
}

export function deactivate(): void {
  // no-op
  return;
}
