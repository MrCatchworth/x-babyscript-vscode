import * as vscode from 'vscode';
import * as watcher from './components/watcher';
import * as child_process from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    watcher.activate(context);
}