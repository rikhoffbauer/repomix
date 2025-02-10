import type { ProcessedFile } from '../../file/fileTypes.js';
import type { RepomixConfigMerged } from '../../../config/configSchema.js';
import type { LlmClient } from './aiProviders.js';
import type { AiGeneratedContent, AiSection, AiSectionType } from './aiSectionTypes.js';
import { OpenAiClient, AnthropicClient, OpenRouterClient } from './aiProviders.js';

export class AiSectionGenerator {
  private llmClient: LlmClient;

  constructor(config: RepomixConfigMerged) {
    this.llmClient = this.createLlmClient(config);
  }

  private createLlmClient(config: RepomixConfigMerged): LlmClient {
    if (!config.ai?.provider) {
      throw new Error('AI provider configuration is required');
    }

    switch (config.ai.provider.type) {
      case 'openai':
        return new OpenAiClient(config.ai.provider);
      case 'anthropic':
        return new AnthropicClient(config.ai.provider);
      case 'openrouter':
        return new OpenRouterClient(config.ai.provider);
      default:
        throw new Error(`Unsupported AI provider: ${config.ai.provider.type}`);
    }
  }

  async generateContent(
    files: ProcessedFile[],
    config: RepomixConfigMerged,
  ): Promise<AiGeneratedContent> {
    const systemSections = await this.generateSystemSections(files, config);
    const fileSections = await this.generateFileSections(files, config);

    return {
      systemSections,
      fileSections,
    };
  }

  private async generateSystemSections(
    files: ProcessedFile[],
    config: RepomixConfigMerged,
  ): Promise<AiSection[]> {
    const sections: AiSection[] = [];
    const enabledSections = config.ai?.sections;

    if (!enabledSections) return sections;

    for (const [type, sectionConfig] of Object.entries(enabledSections)) {
      if (sectionConfig.enabled) {
        const content = await this.llmClient.generate(
          sectionConfig.prompt || this.getDefaultPrompt(type as AiSectionType),
          sectionConfig.maxTokens,
        );
        sections.push({
          type: type as AiSectionType,
          content: content.content,
        });
      }
    }

    return sections;
  }

  private async generateFileSections(
    files: ProcessedFile[],
    config: RepomixConfigMerged,
  ): Promise<AiFileSection[]> {
    // Implementation for file-specific sections
    // Will be implemented in the next part
    return [];
  }

  private getDefaultPrompt(sectionType: AiSectionType): string {
    // Default prompts for each section type
    // Will be implemented in the next part
    return '';
  }
}