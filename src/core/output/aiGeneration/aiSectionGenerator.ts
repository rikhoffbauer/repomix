import type { RepomixConfigMerged } from '../../../config/configSchema.js';
import type { ProcessedFile } from '../../file/fileTypes.js';
import type { AiProvider } from './aiProviders.js';
import type { AiGeneratedContent, AiSection, AiSectionType } from './aiSectionTypes.js';

export class AiSectionGenerator {
  constructor(
    private config: RepomixConfigMerged,
    private provider: AiProvider,
  ) {}

  async generateSections(files: ProcessedFile[]): Promise<AiGeneratedContent> {
    if (!this.config.ai?.enabled || !this.config.ai.provider) {
      return { repositoryLevel: [], fileLevel: {} };
    }

    const repositoryLevel = await this.generateRepositoryLevelSections(files);
    const fileLevel = await this.generateFileLevelSections(files);

    return {
      repositoryLevel,
      fileLevel,
    };
  }

  private async generateRepositoryLevelSections(files: ProcessedFile[]): Promise<AiSection[]> {
    const sections: AiSection[] = [];
    const enabledSections = Object.entries(this.config.ai?.sections || {})
      .filter(([_, config]) => config.enabled)
      .map(([type]) => type as AiSectionType);

    for (const sectionType of enabledSections) {
      const section = await this.generateSection(sectionType, files);
      if (section) {
        sections.push(section);
      }
    }

    return sections;
  }

  private async generateFileLevelSections(files: ProcessedFile[]): Promise<Record<string, AiSection[]>> {
    const fileLevel: Record<string, AiSection[]> = {};
    
    if (!this.config.ai?.sections.fileOverview.enabled) {
      return fileLevel;
    }

    for (const file of files) {
      fileLevel[file.path] = await this.generateFileSections(file);
    }

    return fileLevel;
  }

  private async generateSection(type: AiSectionType, files: ProcessedFile[]): Promise<AiSection | null> {
    const sectionConfig = this.config.ai?.sections[type];
    if (!sectionConfig?.enabled) {
      return null;
    }

    const prompt = this.buildPrompt(type, files, sectionConfig.prompt);
    const response = await this.provider.complete({
      prompt,
      maxTokens: sectionConfig.maxTokens || 1000,
      temperature: this.config.ai?.provider.temperature,
    });

    return {
      type,
      title: this.getSectionTitle(type),
      content: response.content,
    };
  }

  private getSectionTitle(type: AiSectionType): string {
    const titles: Record<AiSectionType, string> = {
      architecture: 'System Architecture Overview',
      functionality: 'Functional Description',
      security: 'Security Analysis',
      dependencies: 'Dependencies Overview',
      fileOverview: 'File Overview',
      systemContext: 'System Context',
      testing: 'Testing Strategy',
    };
    return titles[type];
  }

  private buildPrompt(type: AiSectionType, files: ProcessedFile[], customPrompt?: string): string {
    if (customPrompt) {
      return customPrompt;
    }

    // Default prompts for each section type
    const prompts: Record<AiSectionType, string> = {
      architecture: 'Analyze the codebase and provide a high-level architectural overview...',
      functionality: 'Describe the main functionality and features of this system...',
      // Add other default prompts
    };

    return prompts[type];
  }

  private async generateFileSections(file: ProcessedFile): Promise<AiSection[]> {
    // Implementation for file-level section generation
    return [];
  }
}