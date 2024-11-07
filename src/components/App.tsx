import React, { Component } from "react";
import "../styles/main.css";
import CodeEditor from "./CodeEditor";
import CodeAi from "./CodeAi";
import CodeQuality from "./CodeQuality";
import { OpenAIClient } from "../scripts/OpenAIClient";
import EventEmitter from "events";

interface AppProps {}

interface AppState {
    openAIClient: OpenAIClient;
    interactionEvent: EventEmitter;
}

export class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            openAIClient: new OpenAIClient(),
            interactionEvent: new EventEmitter(),
        };
    }

    render(): JSX.Element {
        return (
            <div className="App">
                <div className="code-editor">
                    <CodeEditor />
                </div>
                <div className="instrument-helpers">
                    <div className="code-quality">
                        <CodeQuality openAIClient={this.state.openAIClient} />
                    </div>
                    <div className="code-from-ai">
                        <CodeAi openAIClient={this.state.openAIClient} />
                    </div>
                </div>
            </div>
        );
    }
}
