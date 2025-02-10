export type AiProviderType = 'openai' | 'anthropic' | 'openrouter';

export interface AiProviderConfig {
  type: AiProviderType;
  apiKey: string;
  model: string;
  maxConcurrentRequests?: number;
  temperature?: number;
  baseUrl?: string;
}

export interface AiProvider {
  generateCompletion(prompt: string, maxTokens: number): Promise<string>;
  countTokens(text: string): Promise<number>;
}

export class OpenAiProvider implements AiProvider {
  constructor(private config: AiProviderConfig) {}

  async generateCompletion(prompt: string, maxTokens: number): Promise<string> {
    // Implementation will go here
    throw new Error('Not implemented');
  }

  async countTokens(text: string): Promise<number> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}

export class AnthropicProvider implements AiProvider {
  constructor(private config: AiProviderConfig) {}

  async generateCompletion(prompt: string, maxTokens: number): Promise<string> {
    // Implementation will go here
    throw new Error('Not implemented');
  }

  async countTokens(text: string): Promise<number> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}

export class OpenRouterProvider implements AiProvider {
  constructor(private config: AiProviderConfig) {}

  async generateCompletion(prompt: string, maxTokens: number): Promise<string> {
    // Implementation will go here
    throw new Error('Not implemented');
  }

  async countTokens(text: string): Promise<number> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}