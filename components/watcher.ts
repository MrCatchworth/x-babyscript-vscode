import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as path from 'path';

let toolPath: string;
let watcherProcess: child_process.ChildProcess;
let watcherOutputChannel: vscode.OutputChannel;
let watcherIsRunning = false;

function watcherExitHandler()
{
    watcherIsRunning = false;
    vscode.window.showErrorMessage('The X-Babyscript watcher has terminated');
    watcherOutputChannel.appendLine('(Watcher process has terminated)');
}

async function watcherCommand()
{
    if (!watcherOutputChannel)
    {
        watcherOutputChannel = vscode.window.createOutputChannel('X-Babyscript Watcher');
    }
    watcherOutputChannel.show();

    // Determine which folder we will watch.
    let watcherPath: string;

    // If exactly one folder is open, we can assume this is the folder to watch.
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length === 1) {
        watcherPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

    // Otherwise, ask the user to help.
    } else {
        const inputResponse = await vscode.window.showInputBox({
            prompt: 'Directory to watch'
        });

        if (!inputResponse || inputResponse.length === 0)
        {
            return;
        }

        watcherPath = inputResponse;
    }

    // If a watcher process is already running, terminate it in favour of a new process.
    if (watcherIsRunning)
    {
        watcherProcess.removeListener('exit', watcherExitHandler);
        watcherProcess.kill();
    }

    watcherProcess = child_process.spawn('dotnet', [
        toolPath,
        'watch',
        watcherPath
    ]);
    watcherIsRunning = true;

    watcherProcess.stderr.on('data', chunk => {
        watcherOutputChannel.append(chunk.toString());
    });

    watcherProcess.on('exit', watcherExitHandler);
}

export function activate(context: vscode.ExtensionContext)
{
    toolPath = path.join(context.extensionPath, 'lib/XRebirthBabyScript.Core.dll');

    context.subscriptions.push(vscode.commands.registerCommand('xbs.watch', watcherCommand));
}