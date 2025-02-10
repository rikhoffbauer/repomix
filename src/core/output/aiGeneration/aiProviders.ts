export type AiProvider = 'openai' | 'anthropic' | 'openrouter';

export interface AiProviderConfig {
  provider: AiProvider;
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AiGenerationRequest {
  prompt: string;
  maxTokens: number;
  temperature: number;
}

export interface AiGenerationResponse {
  content: string;
  tokenCount: number;
}

export interface AiProviderService {
  generateContent(request: AiGenerationRequest): Promise<AiGenerationResponse>;
}

export class OpenAiProvider implements AiProviderService {
  constructor(private config: AiProviderConfig) {}

  async generateContent(request: AiGenerationRequest): Promise<AiGenerationResponse> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}

export class AnthropicProvider implements AiProviderService {
  constructor(private config: AiProviderConfig) {}

  async generateContent(request: AiGenerationRequest): Promise<AiGenerationResponse> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}

export class OpenRouterProvider implements AiProviderService {
  constructor(private config: AiProviderConfig) {}

  async generateContent(request: AiGenerationRequest): Promise<AiGenerationResponse> {
    // Implementation will go here
    throw new Error('Not implemented');
  }
}