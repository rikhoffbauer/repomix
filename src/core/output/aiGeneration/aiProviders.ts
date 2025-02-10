export type AiProviderType = 'openai' | 'anthropic' | 'openrouter';

export interface AiProviderConfig {
  type: AiProviderType;
  apiKey: string;
  model: string;
  maxConcurrentRequests?: number;
  temperature?: number;
  baseUrl?: string;
}

export interface AiProviderResponse {
  content: string;
  tokenCount: number;
}

export interface AiProvider {
  generateContent(prompt: string, maxTokens?: number): Promise<AiProviderResponse>;
}

export class OpenAiProvider implements AiProvider {
  constructor(private config: AiProviderConfig) {}

  async generateContent(prompt: string, maxTokens?: number): Promise<AiProviderResponse> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}

export class AnthropicProvider implements AiProvider {
  constructor(private config: AiProviderConfig) {}

  async generateContent(prompt: string, maxTokens?: number): Promise<AiProviderResponse> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}

export class OpenRouterProvider implements AiProvider {
  constructor(private config: AiProviderConfig) {}

  async generateContent(prompt: string, maxTokens?: number): Promise<AiProviderResponse> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}