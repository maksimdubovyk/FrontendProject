import { OpenAIAPI } from "../server/OpenAIAPI";

export class OpenAIClient {
   private _openaiAPI: OpenAIAPI;
   constructor() {
      this._openaiAPI = new OpenAIAPI();
   }

   public async analyzeCode(code: string): Promise<string> {
      return this._openaiAPI.analyzeCode(code);
   }
   public async improveCode(code: string): Promise<string> {
      return this._openaiAPI.improveCode(code);
   }
}
