import { OpenAIAPI } from "../server/OpenAIAPI";
import { ProgrammingLanguage } from "./ProgrammingLanguage";

export class OpenAIClient {
    private _openaiAPI: OpenAIAPI;
    constructor() {
        this._openaiAPI = new OpenAIAPI();
    }

    public async analyzeCode(code: string): Promise<string> {
        const result = await this._openaiAPI.analyzeCode(code);
        return this.deleteLanguageFromResult(result, ProgrammingLanguage.HTML);
    }
    public async improveCode(code: string, language: ProgrammingLanguage): Promise<string> {
        const result = await this._openaiAPI.improveCode(code, language);
        return this.deleteLanguageFromResult(result, language);
    }

    // eslint-disable-next-line prettier/prettier
    private deleteLanguageFromResult(answer: string, language: ProgrammingLanguage): string {
        const answerWithoutLanguage = answer.replace("```" + language + "\n", "");
        const answerWithoutLanguageAndCode = answerWithoutLanguage.replace("\n```", "");
        return answerWithoutLanguageAndCode;
    }
}
