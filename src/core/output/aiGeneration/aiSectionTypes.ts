export type AiSectionType = 
  | 'architecture_overview'
  | 'functional_description'
  | 'system_dependencies'
  | 'file_summary'
  | 'file_role'
  | 'security_considerations'
  | 'testing_strategy';

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
  maxTokens?: number;
  prompt?: string;
}

export type AiSectionConfigs = {
  [K in AiSectionType]: AiSectionConfig;
};