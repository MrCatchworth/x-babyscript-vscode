# X-Babyscript for Visual Studio Code

This is a syntax highlighter and compiler for the X-Babyscript language.

X-Babyscript is a node-tree-based language that looks C-like when you squint. It transpiles to the subset of XML that X: Rebirth and X4: Foundations use for their scripting system.

Put another way, X-Babyscript is a language that lets you write scripts for XR and X4 without having to look at any XML.

## Features

### Syntax highlighting
`.xbs` files are recognised as X-Babyscript source files and gain syntax highlighting.

### Watchful Compiler
You can use the `X-Babyscript: Watch` command to have the compiler watch a directory, and recompile any `.xbs` files that change. This opens a new channel in the Output pane where you can view any syntactic errors.

## Requirements
The compiler is written in C# as a .NET Core application, so you must have the [.NET Core](https://dotnet.microsoft.com/download) CLI available on your `PATH`.

## Extension Settings
None yet.