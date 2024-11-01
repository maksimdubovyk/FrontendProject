import React, { Component } from 'react';
import Editor from "@monaco-editor/react";

interface CodeEditorProps {}

interface CodeEditorState {
  selectedLanguage: string;
  userCode: string;
}

class CodeEditor extends Component<CodeEditorProps, CodeEditorState> {
  constructor(props: CodeEditorProps) {
    super(props);
    this.state = {
      selectedLanguage: 'javascript',
      userCode: '',
    };
  }

  onQualityCodeButtonClick = (): void => {
    console.log('Quality of code');
  }

  onModifyCodeButtonClick = (): void => {
    console.log('Quality of code');
  }

  handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ selectedLanguage: event.target.value });
  };

  onCodeChange = (userCode: string | undefined, ev: any): void => {
    console.log('Code changed:', userCode);
    userCode = userCode ?? '';
    this.setState({ userCode });
  }

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
      <Editor
        defaultLanguage="javascript"
        language={this.state.selectedLanguage}
        theme="vs-dark"
        defaultValue="// right your code here"
        onChange={this.onCodeChange}
      />
    );
  }

  renderLanguageDropdown() {
    const languages = [
      { code: 'typescript', name: 'TypeScript' },
      { code: 'javascript', name: 'JavaScript' },
      { code: 'css', name: 'CSS' },
      { code: 'python', name: 'Python' },
      { code: 'scss', name: 'SCSS' },
      { code: 'json', name: 'JSON' },
      { code: 'html', name: 'HTML' },
    ];

    return (
      <div className="language-dropdown">
        <label htmlFor="language-select">Select Language:</label>
        <select
          id="language-select"
          value={this.state.selectedLanguage}
          onChange={this.handleLanguageChange}
          className="dropdown"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  renderBottom() {
    return (
      <div className="bottom">
        <button className='button' onClick={this.onQualityCodeButtonClick}>Get quality of code</button>
        <button className='button' onClick={this.onModifyCodeButtonClick}>Get modify code</button>
        {this.renderLanguageDropdown()}
      </div>
    );
  }
}

export default CodeEditor;
