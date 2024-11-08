import React, { Component } from "react";
import Editor from "@monaco-editor/react";
import { OpenAIClient } from "../scripts/OpenAIClient";
import { EventEmitter } from "stream";
import { ProgrammingLanguage } from "../scripts/ProgrammingLanguage";

interface CodeAiProps {
    openAIClient: OpenAIClient;
    interactionEvent: EventEmitter;
}

interface CodeAiState {
    code: string;
    showAlert: boolean; 
    codeResult: string;
}

class CodeAi extends Component<CodeAiProps, CodeAiState> {
    constructor(props: CodeAiProps) {
        super(props);
        this.state = {
            code: "import React", 
            showAlert: false, 
            codeResult: "",
        };
    }

    componentDidMount(): void {
        this.props.interactionEvent.on("codeFromAi", this.handleCodeRequest );
    }

    componentWillUnmount(): void {
        this.props.interactionEvent.removeListener("codeFromAi", this.handleCodeRequest);
    }
    handleCodeRequest = async (code : string, language: ProgrammingLanguage): Promise<void> => {
        try {
            const response = await this.props.openAIClient.improveCode(code, language); 
            this.setState({ codeResult: response }); 
        } catch (error) {
            console.error("Error fetching code from AI: ", error);
        }
    };
    render(): JSX.Element {
        return (
            <>
                {this.renderEditorAi()}
                {this.renderBottomAi()}
                {this.state.showAlert && this.renderAlert()}{" "}
            </>
        );
    }

    renderEditorAi(): JSX.Element {
        return (
            <div className="codeWindow">
                <Editor
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={this.state.codeResult} 
                    options={{ readOnly: true }} 
                />
            </div>
        );
    }

    renderBottomAi(): JSX.Element {
        return (
            <div className="bottomAi">
                <button className="button" onClick={this.handleCopy}>
                    Copy
                </button>
                <button className="button" onClick={this.handleExport}>
                    Export
                </button>
            </div>
        );
    }

    handleCopy = (): void => {
        navigator.clipboard
            .writeText(this.state.code)
            .then(() => {
                this.setState({ showAlert: true }); 
                setTimeout(() => {
                    this.setState({ showAlert: false }); 
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
        a.download = "code.txt"; 
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
