import * as vscode from 'vscode';
import * as child_process from 'child_process';
import { toolPath } from './globals';
import { basename } from 'path';

let conversionOutputChannel: vscode.OutputChannel;

interface ConvertCommandOptions
{
    id: string,
    transpilerVerb: string
}

function createConvertCommand(context: vscode.ExtensionContext, options: ConvertCommandOptions)
{
    context.subscriptions.push(vscode.commands.registerCommand(options.id, () => {
        if (!conversionOutputChannel)
        {
            conversionOutputChannel = vscode.window.createOutputChannel('X-Babyscript - Tasks');
        }

        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor)
        {
            return;
        }

        if (activeEditor.document.uri.scheme !== 'file')
        {
            return;
        }

        const activeFilePath = activeEditor.document.uri.fsPath;
        const convertProcess = child_process.spawn('dotnet', [
            toolPath,
            options.transpilerVerb,
            '-f',
            activeFilePath
        ]);

        convertProcess.stderr.on('data', chunk => {
            conversionOutputChannel.append(chunk.toString());
        });

        convertProcess.on('exit', (code, signal) => {
            if (code !== 0)
            {
                conversionOutputChannel.show(true);
                vscode.window.showErrorMessage(`X-Babyscript: Conversion failed for ${basename(activeFilePath)}`);
            }
        });
    }));
}

export function activate(context: vscode.ExtensionContext)
{
    createConvertCommand(context, {
        id: 'xbs.compile',
        transpilerVerb: 'compile'
    });

    createConvertCommand(context, {
        id: 'xbs.decompile',
        transpilerVerb: 'decompile'
    });
}