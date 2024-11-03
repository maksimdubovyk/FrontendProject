import React, { Component } from "react";
import Editor from "@monaco-editor/react";

// Інтерфейси для props і state
interface CodeQualityProps {}

interface CodeQualityState {
   code: string;
   showAlert: boolean; // Додаємо стан для сповіщення
}

class CodeQuality extends Component<CodeQualityProps, CodeQualityState> {
   constructor(props: CodeQualityProps) {
      super(props);
      this.state = {
         code: "// 1w231422", // Статичний текст
         showAlert: false, // Ініціалізуємо стан сповіщення
      };
   }

   // Метод для копіювання коду в буфер обміну
   copyCode = () => {
      const { code } = this.state;

      navigator.clipboard
         .writeText(code)
         .then(() => {
            this.setState({ showAlert: true }); // Показуємо сповіщення
            setTimeout(() => {
               this.setState({ showAlert: false }); // Сховаємо сповіщення через 2 секунди
            }, 2000);
         })
         .catch((err) => {
            console.error("Failed to copy code: ", err);
         });
   };

   // Метод для експорту коду
   exportCode = () => {
      const blob = new Blob([this.state.code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "code_quality.txt"; // Ім'я для експортованого файлу
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   };

   render() {
      return (
         <div>
            <h1 className="code-quality">Quality Assessment</h1>
            <div style={{ display: "flex", marginTop: "10px" }}>
               {this.renderEditor()}
               {this.renderBottomA()}
            </div>
            {this.state.showAlert && this.renderAlert()}{" "}
            {/* Відображаємо сповіщення */}
         </div>
      );
   }

   renderEditor() {
      return (
         <div className="editor-container">
            <Editor
               defaultLanguage="javascript"
               theme="vs-dark"
               value={this.state.code} // Використовуємо value для заборони редагування
               options={{
                  readOnly: true, // Забороняємо редагування
               }}
            />
         </div>
      );
   }

   renderBottomA() {
      return (
         <div className="bottomA">
            <button onClick={this.copyCode} className="copy-button">
               Copy
            </button>
            <button onClick={this.exportCode} className="export-button">
               Export
            </button>
         </div>
      );
   }

   renderAlert() {
      return <div className="alert">Code quality assessments copied!</div>;
   }
}

export default CodeQuality;
