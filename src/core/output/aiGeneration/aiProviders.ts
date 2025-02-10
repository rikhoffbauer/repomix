export interface AiProviderConfig {
  type: 'openai' | 'anthropic' | 'openrouter';
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AiCompletionRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AiCompletionResponse {
  content: string;
  tokenCount: number;
}

export interface AiProvider {
  generateCompletion(request: AiCompletionRequest): Promise<AiCompletionResponse>;
}

export class OpenAiProvider implements AiProvider {
  constructor(private config: AiProviderConfig) {}

  async generateCompletion(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}

export class AnthropicProvider implements AiProvider {
  constructor(private config: AiProviderConfig) {}

  async generateCompletion(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}

export class OpenRouterProvider implements AiProvider {
  constructor(private config: AiProviderConfig) {}

  async generateCompletion(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}