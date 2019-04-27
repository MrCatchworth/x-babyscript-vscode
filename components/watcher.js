"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
const child_process = __importStar(require("child_process"));
const globals = __importStar(require("./globals"));
let watcherProcess;
let watcherOutputChannel;
let watcherIsRunning = false;
function watcherExitHandler() {
    watcherIsRunning = false;
    vscode.window.showErrorMessage('The X-Babyscript watcher has terminated');
    watcherOutputChannel.appendLine('(Watcher process has terminated)');
}
async function watcherCommand() {
    if (!watcherOutputChannel) {
        watcherOutputChannel = vscode.window.createOutputChannel('X-Babyscript Watcher');
    }
    watcherOutputChannel.show();
    // Determine which folder we will watch.
    let watcherPath;
    // If exactly one folder is open, we can assume this is the folder to watch.
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length === 1) {
        watcherPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        // Otherwise, ask the user to help.
    }
    else {
        const inputResponse = await vscode.window.showInputBox({
            prompt: 'Directory to watch'
        });
        if (!inputResponse || inputResponse.length === 0) {
            return;
        }
        watcherPath = inputResponse;
    }
    // If a watcher process is already running, terminate it in favour of a new process.
    if (watcherIsRunning) {
        watcherProcess.removeListener('exit', watcherExitHandler);
        watcherProcess.kill();
    }
    watcherProcess = child_process.spawn('dotnet', [
        globals.toolPath,
        'watch',
        watcherPath
    ]);
    watcherIsRunning = true;
    watcherProcess.stderr.on('data', chunk => {
        watcherOutputChannel.append(chunk.toString());
    });
    watcherProcess.on('exit', watcherExitHandler);
}
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('xbs.watch', watcherCommand));
}
exports.activate = activate;
