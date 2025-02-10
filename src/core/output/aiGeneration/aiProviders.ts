export type AiProviderType = 'openai' | 'anthropic' | 'openrouter';

export interface AiProviderConfig {
  type: AiProviderType;
  apiKey: string;
  model: string;
  baseUrl?: string;
  maxTokensPerRequest?: number;
  temperature?: number;
}

export interface AiCompletionRequest {
  prompt: string;
  maxTokens: number;
  temperature?: number;
}

export interface AiCompletionResponse {
  content: string;
  totalTokens: number;
}

export interface AiProvider {
  complete(request: AiCompletionRequest): Promise<AiCompletionResponse>;
}

export class OpenAiProvider implements AiProvider {
  constructor(private config: AiProviderConfig) {}

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}

export class AnthropicProvider implements AiProvider {
  constructor(private config: AiProviderConfig) {}

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}

export class OpenRouterProvider implements AiProvider {
  constructor(private config: AiProviderConfig) {}

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}