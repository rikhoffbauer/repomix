export type AiSectionType =
  | 'architecture_overview'
  | 'functional_description'
  | 'system_dependencies'
  | 'file_summary'
  | 'file_role'
  | 'security_considerations'
  | 'code_quality_analysis';

export interface AiGeneratedSection {
  type: AiSectionType;
  content: string;
}

export interface AiGeneratedFileSection {
  filePath: string;
  sections: AiGeneratedSection[];
}

export interface AiGeneratedContent {
  systemSections: AiGeneratedSection[];
  fileSections: AiGeneratedFileSection[];
}