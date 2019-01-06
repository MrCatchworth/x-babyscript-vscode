# X-Babyscript for Visual Studio Code

This is a syntax highlighter and compiler for the X-Babyscript language.

X-Babyscript is a node-tree-based language that looks C-like when you squint. It transpiles to the subset of XML that X: Rebirth and X4: Foundations use for their scripting system.

Put another way, X-Babyscript is a language that lets you write scripts for XR and X4 without having to look at any XML.

## Links
[Github](https://github.com/MrCatchworth/x-babyscript-vscode)

[Github (conversion tool)](https://github.com/MrCatchworth/x-babyscript)

## Features

### Syntax highlighting
`.xbs` files are recognised as X-Babyscript source files and gain syntax highlighting.

### Added commands
* `xbs.compile` - Compile the current file
* `xbs.decompile` - Decompile the current file
* `xbs.watch` - Watch the opened folder for changes in `.xbs` files and compile them whenever they change. You'll be prompted for a path if you don't have exactly one folder open.

### Viewing conversion results
Output from the conversion tool can be found in new output channels - look for "X-Babyscript" in the name.

## Requirements
The compiler is written in C# as a .NET Core application, so you must have the [.NET Core](https://dotnet.microsoft.com/download) CLI available on your `PATH`.

## Extension Settings
None yet.