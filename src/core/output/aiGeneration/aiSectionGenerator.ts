import type { ProcessedFile } from '../../file/fileTypes.js';
import type { RepomixConfigMerged } from '../../../config/configSchema.js';
import type { AiGeneratedContent, AiSectionType } from './aiSectionTypes.js';
import {
  type AiProviderConfig,
  type AiProviderService,
  OpenAiProvider,
  AnthropicProvider,
  OpenRouterProvider,
} from './aiProviders.js';

export class AiSectionGenerator {
  private provider: AiProviderService;

  constructor(private config: RepomixConfigMerged) {
    const providerConfig: AiProviderConfig = {
      provider: config.ai.provider,
      apiKey: process.env.REPOMIX_AI_API_KEY || '',
      model: config.ai.model,
      maxTokens: config.ai.maxTokensPerRequest,
      temperature: config.ai.temperature,
    };

    switch (config.ai.provider) {
      case 'openai':
        this.provider = new OpenAiProvider(providerConfig);
        break;
      case 'anthropic':
        this.provider = new AnthropicProvider(providerConfig);
        break;
      case 'openrouter':
        this.provider = new OpenRouterProvider(providerConfig);
        break;
      default:
        throw new Error(`Unsupported AI provider: ${config.ai.provider}`);
    }
  }

  async generateContent(files: ProcessedFile[]): Promise<AiGeneratedContent> {
    const systemSections = await this.generateSystemSections(files);
    const fileSections = await this.generateFileSections(files);

    return {
      systemSections,
      fileSections,
    };
  }

  private async generateSystemSections(files: ProcessedFile[]): Promise<AiGeneratedSection[]> {
    // Implementation will go here
    return [];
  }

  private async generateFileSections(files: ProcessedFile[]): Promise<AiGeneratedFileSection[]> {
    // Implementation will go here
    return [];
  }
}