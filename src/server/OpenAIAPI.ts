import OpenAI from "openai";
import { OpenAIModels } from "./OpenAIModels";
import { ProgrammingLanguage } from "../scripts/ProgrammingLanguage";
import { ChatCompletionMessageParam } from "openai/resources";

export class OpenAIAPI {
    private openai: OpenAI;

    constructor() {
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

        if (!apiKey) {
            throw new Error(
                "API key is missing. Please set REACT_APP_OPENAI_API_KEY in your .env file.",
            );
        }
        this.openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    }

    public async analyzeCode(code: string): Promise<string> {
        const prompt = `Analyze the code and assess its clarity, categorizing issues as soft, medium, or hard. Provide only the quality assessment without code, shortening the text of the assessment to state the main problem without explanation:\n\n${code}`;
        const messages: ChatCompletionMessageParam[] = [
            { role: "user", content: "" },
            { role: "user", content: prompt },
        ];
        return await this.sendRequest(messages);
    }

    public async improveCode(
        code: string,
        language: ProgrammingLanguage,
    ): Promise<string> {
        const prompt = `Rewrite this ${language} code to make it high-quality, understandable, efficient, and compliant with the coding standards for the specified programming language, following the principles of readability, maintainability, and optimality. Generate only code without explanations:\n\n${code}`;
        const messages: ChatCompletionMessageParam[] = [
            { role: "user", content: "" },
            { role: "user", content: prompt },
        ];
        return await this.sendRequest(messages);
    }

    private async sendRequest(
        messages: ChatCompletionMessageParam[],
    ): Promise<string> {
        try {
            const completion = await this.openai.chat.completions.create({
                model: OpenAIModels.GPT_4O_MINI,
                messages,
            });
            return completion.choices[0].message.content.trim();
        } catch (error) {
            console.error("Error:", error);
            return "Error happend";
        }
    }
}
