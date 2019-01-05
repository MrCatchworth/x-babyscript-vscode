import * as vscode from 'vscode';
import * as watcher from './components/watcher';
import * as globals from './components/globals';
import * as conversionCommands from './components/conversionCommands';

export function activate(context: vscode.ExtensionContext) {
    globals.activate(context);
    watcher.activate(context);
    conversionCommands.activate(context);
}