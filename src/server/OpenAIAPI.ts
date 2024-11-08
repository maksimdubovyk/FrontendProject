import OpenAI from "openai";
import { OpenAIModels } from "./OpenAIModels";

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
        return await this.sendRequest(prompt);
    }
    public async improveCode(code: string): Promise<string> {
        const prompt = `Перепиши цей TypeScript код, щоб він був якісніший:\n\n${code}`;
        return await this.sendRequest(prompt);
    }

    private async sendRequest(prompt: string): Promise<string> {
        try {
            const completion = await this.openai.chat.completions.create({
                model: OpenAIModels.GPT_3_5_TURBO,
                messages: [{ role: "user", content: prompt }],
            });
            return completion.choices[0].message.content.trim();
        } catch (error) {
            console.error("Error:", error);
            return "Error happend";
        }
    }
}
