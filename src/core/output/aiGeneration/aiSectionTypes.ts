export type AiSectionType =
  | 'architecture_overview'
  | 'functional_description'
  | 'system_dependencies'
  | 'file_summary'
  | 'file_role'
  | 'security_considerations'
  | 'code_quality_analysis';

export interface AiSection {
  type: AiSectionType;
  content: string;
}

export interface AiFileSection {
  filePath: string;
  sections: AiSection[];
}

export interface AiGeneratedContent {
  systemSections: AiSection[];
  fileSections: AiFileSection[];
}

export interface AiSectionConfig {
  enabled: boolean;
  prompt?: string;
  maxTokens?: number;
}

export type AiSectionConfigs = {
  [K in AiSectionType]: AiSectionConfig;
};