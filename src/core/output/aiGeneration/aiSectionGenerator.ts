import type { ProcessedFile } from '../../file/fileTypes.js';
import type { RepomixConfigMerged } from '../../../config/configSchema.js';
import type { AiProvider } from './aiProviders.js';
import type { AiGeneratedContent, AiSection, AiSectionType } from './aiSectionTypes.js';

export class AiSectionGenerator {
  constructor(
    private provider: AiProvider,
    private config: RepomixConfigMerged,
  ) {}

  async generateSections(files: ProcessedFile[]): Promise<AiGeneratedContent> {
    if (!this.config.ai?.enabled) {
      return { systemSections: [], fileSections: [] };
    }

    const systemSections = await this.generateSystemSections(files);
    const fileSections = await this.generateFileSections(files);

    return {
      systemSections,
      fileSections,
    };
  }

  private async generateSystemSections(files: ProcessedFile[]): Promise<AiSection[]> {
    const sections: AiSection[] = [];
    const sectionConfigs = this.config.ai?.sections;

    if (!sectionConfigs) return sections;

    for (const [type, config] of Object.entries(sectionConfigs)) {
      if (config.enabled) {
        const content = await this.provider.generateCompletion(
          this.buildSystemPrompt(type as AiSectionType, files),
          config.maxTokens || 1000
        );
        sections.push({ type: type as AiSectionType, content });
      }
    }

    return sections;
  }

  private async generateFileSections(files: ProcessedFile[]): Promise<AiFileSection[]> {
    // Implementation will go here
    return [];
  }

  private buildSystemPrompt(type: AiSectionType, files: ProcessedFile[]): string {
    // Implementation will go here
    return '';
  }
}