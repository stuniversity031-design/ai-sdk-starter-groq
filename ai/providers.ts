import { groq } from "@ai-sdk/groq";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";

const languageModels = {
  "llama-3.1-8b-instant": groq("llama-3.1-8b-instant"),
  "llama-3.1-70b-versatile": groq("llama-3.1-70b-versatile"),
  "mixtral-8x7b-32768": groq("mixtral-8x7b-32768"),
  "deepseek-r1-distill-llama-70b": wrapLanguageModel({
    middleware: extractReasoningMiddleware({
      tagName: "think",
    }),
    model: groq("deepseek-r1-distill-llama-70b"),
  }),
};

export const model = customProvider({
  languageModels,
});

export type modelID = keyof typeof languageModels;

export const MODELS = Object.keys(languageModels);

export const defaultModel: modelID = "llama-3.1-70b-versatile";
