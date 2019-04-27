"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const watcher = __importStar(require("./components/watcher"));
const globals = __importStar(require("./components/globals"));
const conversionCommands = __importStar(require("./components/conversionCommands"));
function activate(context) {
    globals.activate(context);
    watcher.activate(context);
    conversionCommands.activate(context);
}
exports.activate = activate;
