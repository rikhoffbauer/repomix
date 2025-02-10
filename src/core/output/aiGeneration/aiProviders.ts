export type LlmProvider = 'openai' | 'anthropic' | 'openrouter';

export interface LlmProviderConfig {
  provider: LlmProvider;
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  baseUrl?: string;
}

export interface LlmResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface LlmClient {
  generate(prompt: string, maxTokens?: number): Promise<LlmResponse>;
}

export class OpenAiClient implements LlmClient {
  // Implementation will go here
}

export class AnthropicClient implements LlmClient {
  // Implementation will go here
}

export class OpenRouterClient implements LlmClient {
  // Implementation will go here
}