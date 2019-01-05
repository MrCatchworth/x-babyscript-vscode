"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = __importStar(require("vscode"));
var child_process = __importStar(require("child_process"));
var globals_1 = require("./globals");
var path_1 = require("path");
var conversionOutputChannel;
function createConvertCommand(context, options) {
    context.subscriptions.push(vscode.commands.registerCommand(options.id, function () {
        if (!conversionOutputChannel) {
            conversionOutputChannel = vscode.window.createOutputChannel('X-Babyscript - Tasks');
        }
        var activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        if (activeEditor.document.uri.scheme !== 'file') {
            return;
        }
        var activeFilePath = activeEditor.document.uri.fsPath;
        var convertProcess = child_process.spawn('dotnet', [
            globals_1.toolPath,
            options.transpilerVerb,
            '-f',
            activeFilePath
        ]);
        convertProcess.stderr.on('data', function (chunk) {
            conversionOutputChannel.append(chunk.toString());
        });
        convertProcess.on('exit', function (code, signal) {
            if (code !== 0) {
                conversionOutputChannel.show(true);
                vscode.window.showErrorMessage("X-Babyscript: Conversion failed for " + path_1.basename(activeFilePath));
            }
        });
    }));
}
function activate(context) {
    createConvertCommand(context, {
        id: 'xbs.compile',
        transpilerVerb: 'compile'
    });
    createConvertCommand(context, {
        id: 'xbs.decompile',
        transpilerVerb: 'decompile'
    });
}
exports.activate = activate;
