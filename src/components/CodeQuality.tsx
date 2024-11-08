import React, { Component } from "react";
import { OpenAIClient } from "../scripts/OpenAIClient";

interface CodeQualityProps {
    openAIClient: OpenAIClient;
}

interface CodeQualityState {
    code: string;
    showAlert: boolean;
}

class CodeQuality extends Component<CodeQualityProps, CodeQualityState> {
    constructor(props: CodeQualityProps) {
        super(props);
        this.state = {
            code: "// 1w231422смитьбдюждблорпавівапролвапролорпавівапролорнеаквіуцуаенгошлгнеквуіцувапнгошщогнеавкуіявапрошогпнаевкукаенгщдлщшорнеаквуівкаепнргшощз// 1w231422смитьбдюждблорпавівапролвапролорпавівапролорнеаквіуцуаенгошлгнеквуіцувапнгошщогнеавкуіявапрошогпнаевкукаенгщдлщшорнеаквуівкаепнргшощз// 1w231422смитьбдюждблорпавівапролвапролорпавівапролорнеаквіуцуаенгошлгнеквуіцувапнгошщогнеавкуіявапрошогпнаевкукаенгщдлщшорнеаквуівкаепнргшощз// 1w231422смитьбдюждблорпавівапролвапролорпавівапролорнеаквіуцуаенгошлгнеквуіцувапнгошщогнеавкуіявапрошогпнаевкукаенгщдлщшорнеаквуівкаепнргшощз// 1w231422смитьбдюждблорпавівапролвапролорпавівапролорнеаквіуцуаенгошлгнеквуіцувапнгошщогнеавкуіявапрошогпнаевкукаенгщдлщшорнеаквуівкаепнргшощз// 1w231422смитьбдюждблорпавівапролвапролорпавівапролорнеаквіуцуаенгошлгнеквуіцувапнгошщогнеавкуіявапрошогпнаевкукаенгщдлщшорнеаквуівкаепнргшощз",
            showAlert: false,
        };
    }

    copyCode = (): void => {
        const { code } = this.state;

        navigator.clipboard
            .writeText(code)
            .then(() => this.showAlert())
            .catch((err) => console.error("Failed to copy code: ", err));
    };

    exportCode = (): void => {
        const { code } = this.state;
        const blob = new Blob([code], { type: "text/plain" });
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
                    <div className="code-display">{this.state.code}</div>
                </div>
                {this.renderBottomA()}
                {this.state.showAlert && (
                    <div className="alert">
                        Code quality assessments copied!
                    </div>
                )}
            </>
        );
    }

    renderBottomA(): JSX.Element {
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
}

export default CodeQuality;
