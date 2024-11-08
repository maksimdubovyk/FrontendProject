import React, { Component } from "react";
import Editor from "@monaco-editor/react";
import { OpenAIClient } from "../scripts/OpenAIClient";

// Определение типов для props и state
interface CodeAiProps {
   openAIClient: OpenAIClient;
}

interface CodeAiState {
   code: string;
   showAlert: boolean; // Состояние для отображения уведомления
}

class CodeAi extends Component<CodeAiProps, CodeAiState> {
   constructor(props: CodeAiProps) {
      super(props);
      this.state = {
         code: "import React", // Состояние для кода
         showAlert: false, // Изначально уведомление скрыто
      };
   }

   render(): JSX.Element {
      return (
         <>
            {this.renderEditorAi()}
            {this.renderBottomAi()}
            {this.state.showAlert && this.renderAlert()}{" "}
            {/* Условное отображение уведомления */}
         </>
      );
   }

   renderEditorAi(): JSX.Element {
      return (
         <div className="codeWindow">
            <Editor
               defaultLanguage="javascript"
               theme="vs-dark"
               value={this.state.code} // Используйте состояние для значения кода
               options={{ readOnly: true }} // Режим только для чтения
            />
         </div>
      );
   }

   renderBottomAi(): JSX.Element {
      return (
         <div className="bottomAi">
            <button className="button" onClick={this.handleCopy}>Copy</button>
            <button className="button" onClick={this.handleExport}>Export</button>
         </div>
      );
   }

   handleCopy = (): void => {
      navigator.clipboard
         .writeText(this.state.code)
         .then(() => {
            this.setState({ showAlert: true }); // Показываем уведомление
            setTimeout(() => {
               this.setState({ showAlert: false }); // Скрываем уведомление через 2 секунды
            }, 2000);
         })
         .catch((err) => {
            console.error("Failed to copy code: ", err);
         });
   };

   handleExport = (): void => {
      const blob = new Blob([this.state.code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "code.txt"; // Имя для экспортированного файла
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   };

   renderAlert(): JSX.Element {
      return <div className="alertCopy">Code copied to clipboard!</div>;
   }
}

export default CodeAi;
