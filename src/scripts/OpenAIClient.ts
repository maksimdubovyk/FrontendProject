import { OpenAIAPI } from "../server/OpenAIAPI";
import { ProgrammingLanguage } from "./ProgrammingLanguage";

export class OpenAIClient {
    private _openaiAPI: OpenAIAPI;
    constructor() {
        this._openaiAPI = new OpenAIAPI();
    }

    public async analyzeCode(code: string): Promise<string> {
        return await this._openaiAPI.analyzeCode(code);
    }
    public async improveCode(
        code: string,
        language: ProgrammingLanguage,
    ): Promise<string> {
        return await this._openaiAPI.improveCode(code, language);
    }
}
