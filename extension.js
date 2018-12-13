// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "translation" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    // let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
    //     // The code you place here will be executed every time your command is executed

    //     // Display a message box to the user
    //     vscode.window.showInformationMessage('Hello World!');
    // });

    // context.subscriptions.push(disposable);


    let disposable = vscode.commands.registerCommand('extension.translate2345', () => {

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        let selection = editor.selection;
        let text = editor.document.getText(selection);
        translateView(text.toString());
    });

    context.subscriptions.push(disposable);
}

function translateView(str) {
    const panel = vscode.window.createWebviewPanel(
        'translate', // viewType
        "翻译", // 视图标题
        vscode.ViewColumn.Beside, // 显示在编辑器的哪个部位
        {
            enableScripts: true, // 启用JS，默认禁用,这个一定要设为true;不然打开的iframe框有问题；
        }
    );
    panel.webview.html = getWebviewContent(str);
}

function getWebviewContent(str) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>自定义欢迎页</title>
    </head>
    <body>
        <iframe src="https://fanyi.baidu.com/?aldtype=85#en/zh/${str}" style="width:100%;height: 900px;"></iframe>
    </body>
    </html>
`;
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;