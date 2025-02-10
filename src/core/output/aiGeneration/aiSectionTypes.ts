export type AiSectionType =
  | 'architecture'
  | 'functionality'
  | 'security'
  | 'dependencies'
  | 'fileOverview'
  | 'systemContext'
  | 'testing'
  | 'deployment';

export interface AiSection {
  type: AiSectionType;
  title: string;
  content: string;
}

export interface AiGeneratedContent {
  repositoryLevel: AiSection[];
  fileLevel: Record<string, AiSection[]>;
}

export interface AiSectionConfig {
  enabled: boolean;
  prompt?: string;
  maxTokens?: number;
}

export type AiSectionConfigs = Record<AiSectionType, AiSectionConfig>;