import OpenAI from "openai";
import { OpenAIModels } from "./OpenAIModels";

export class OpenAIClient {
   private openai: OpenAI;

   constructor() {
      this.openai = new OpenAI();
   }

   public async analyzeCode(code: string): Promise<string> {
      const prompt = `Проаналізуй цей TypeScript код і надай помилки та рекомендації для покращення:\n\n${code}`;
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
