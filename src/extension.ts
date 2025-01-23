'use strict';
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.openGhostty', (e: vscode.Uri) => {
    if (process.platform === 'darwin') {
      console.log(e);
      fs.stat(e.fsPath, (err, stats) => {
        if (err) {
          return;
        }

        let dirPath = e.fsPath;
        if (stats.isFile()) {
          dirPath = path.dirname(dirPath);
        }

        console.log(dirPath);
        exec(`open -a Ghostty ${dirPath}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`执行出错: ${error}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
        });
      });
    } else {
      vscode.commands.executeCommand('workbench.action.terminal.openNativeConsole', e);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
