import * as vscode from 'vscode';
import * as path from 'path';

export var toolPath: string;

export function activate(context: vscode.ExtensionContext)
{
    toolPath = path.join(context.extensionPath, 'lib/XBabyScript.dll');
}