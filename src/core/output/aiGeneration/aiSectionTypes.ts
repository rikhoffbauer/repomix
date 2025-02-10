export type AiSectionType = 
  | 'architecture_overview'
  | 'functional_description'
  | 'system_requirements'
  | 'file_summary'
  | 'file_role'
  | 'code_quality_review'
  | 'security_analysis'
  | 'dependency_analysis';

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