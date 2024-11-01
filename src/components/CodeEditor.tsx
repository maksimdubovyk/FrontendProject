import React, { Component } from 'react';
import Editor from "@monaco-editor/react";

class CodeEditor extends Component {
  render() {
    return (
      <>
        {this.renderEditor()}
        {this.renderBottom()}
      </>
    );
  }

  renderEditor() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Editor
          defaultLanguage="javascript"
          theme="vs-dark"
          defaultValue="// some comment"
        />
      </div>

    );
  }

  renderBottom() {
    return (
      <div className="bottom">
        <button>Get quality of code</button>
        <button>Get modify code</button>
      </div>
    );
  }
}

export default CodeEditor;
