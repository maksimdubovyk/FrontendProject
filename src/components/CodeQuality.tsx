import React, { Component } from "react";
import { OpenAIClient } from "../scripts/OpenAIClient";
import EventEmitter from "events";

interface CodeQualityProps {
    openAIClient: OpenAIClient;
    interactionEvent: EventEmitter;
}

interface CodeQualityState {
    showAlert: boolean;
    textOfQuality: string;
}

class CodeQuality extends Component<CodeQualityProps, CodeQualityState> {
    constructor(props: CodeQualityProps) {
        super(props);
        this.state = {
            textOfQuality: "",
            showAlert: false,
        };
    }

    componentDidMount(): void {
        this.props.interactionEvent.on("get-quality-text", this.updateTextOfQuality);
    }

    componentWillUnmount(): void {
        this.props.interactionEvent.removeListener("get-quality-text", this.updateTextOfQuality);
    }

    updateTextOfQuality = async (code: string): Promise<void> => {
        const response = await this.props.openAIClient.analyzeCode(code);
        this.setState({ textOfQuality: response });
    };

    copyCode = (): void => {
        const { textOfQuality } = this.state;

        navigator.clipboard
            .writeText(textOfQuality)
            .then(() => this.showAlert())
            .catch((err) => console.error("Failed to copy code: ", err));
    };

    exportCode = (): void => {
        const { textOfQuality } = this.state;
        const blob = new Blob([textOfQuality], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = "code_quality.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    showAlert = (): void => {
        this.setState({ showAlert: true });
        setTimeout(() => this.setState({ showAlert: false }), 2000);
    };

    render(): JSX.Element {
        return (
            <>
                <div className="code-display-container">
                    <div
                        className="code-display"
                        dangerouslySetInnerHTML={{
                            __html: this.state.textOfQuality,
                        }}
                    />
                </div>
                {this.renderBottomA()}
                {this.state.showAlert && <div className="alert">Code quality assessments copied!</div>}
            </>
        );
    }

    renderBottomA(): JSX.Element {
        return (
            <div className="bottomA">
                <button onClick={this.copyCode} className="button">
                    Copy
                </button>
                <button onClick={this.exportCode} className="button">
                    Export
                </button>
            </div>
        );
    }
}

export default CodeQuality;
