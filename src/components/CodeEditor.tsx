import React, { Component, ChangeEvent } from "react";
import Editor from "@monaco-editor/react";
import { ProgrammingLanguage } from "../scripts/ProgrammingLanguage";
import EventEmitter from "events";

interface CodeEditorProps {
    interactionEvent: EventEmitter;
}

interface CodeEditorState {
    selectedLanguage: string;
    userCode: string;
}

class CodeEditor extends Component<CodeEditorProps, CodeEditorState> {
    constructor(props: CodeEditorProps) {
        super(props);
        this.state = {
            selectedLanguage: "javascript",
            userCode: "",
        };
    }

    onQualityCodeButtonClick = (): void => {
        this.props.interactionEvent.emit(
            "get-quality-code",
            this.state.userCode,
        );
    };

    onModifyCodeButtonClick = (): void => {
        this.props.interactionEvent.emit(
            "get-good-code",
            this.state.userCode,
            this.state.selectedLanguage,
        );
    };

    handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        this.setState({ selectedLanguage: event.target.value });
    };

    onCodeChange = (userCode: string | undefined): void => {
        userCode = userCode ?? "";
        this.setState({ userCode });
    };

    render(): JSX.Element {
        return (
            <>
                {this.renderEditor()}
                {this.renderBottom()}
            </>
        );
    }

    renderEditor(): JSX.Element {
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

    renderLanguageDropdown(): JSX.Element {
        const languages = [
            ProgrammingLanguage.TypeScript,
            ProgrammingLanguage.JavaScript,
            ProgrammingLanguage.CSS,
            ProgrammingLanguage.Python,
            ProgrammingLanguage.SCSS,
            ProgrammingLanguage.JSON,
            ProgrammingLanguage.HTML,
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
                        <option key={language} value={language}>
                            {language.capitalize()}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    renderBottom(): JSX.Element {
        return (
            <div className="bottom">
                <button
                    className="button"
                    onClick={this.onQualityCodeButtonClick}
                >
                    Get quality of code
                </button>
                <button
                    className="button"
                    onClick={this.onModifyCodeButtonClick}
                >
                    Get modify code
                </button>
                {this.renderLanguageDropdown()}
            </div>
        );
    }
}

export default CodeEditor;
