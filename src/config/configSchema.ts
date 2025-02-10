import type { TiktokenEncoding } from 'tiktoken';
import { z } from 'zod';

// Output style enum
export const repomixOutputStyleSchema = z.enum(['plain', 'xml', 'markdown']);
export type RepomixOutputStyle = z.infer<typeof repomixOutputStyleSchema>;

// Default values map
export const defaultFilePathMap: Record<RepomixOutputStyle, string> = {
  plain: 'repomix-output.txt',
  markdown: 'repomix-output.md',
  xml: 'repomix-output.xml',
} as const;

// Base config schema
export const repomixConfigBaseSchema = z.object({
  output: z
    .object({
      filePath: z.string().optional(),
      style: repomixOutputStyleSchema.optional(),
      parsableStyle: z.boolean().optional(),
      headerText: z.string().optional(),
      instructionFilePath: z.string().optional(),
      fileSummary: z.boolean().optional(),
      directoryStructure: z.boolean().optional(),
      removeComments: z.boolean().optional(),
      removeEmptyLines: z.boolean().optional(),
      topFilesLength: z.number().optional(),
      showLineNumbers: z.boolean().optional(),
      copyToClipboard: z.boolean().optional(),
      includeEmptyDirectories: z.boolean().optional(),
    })
    .optional(),
  include: z.array(z.string()).optional(),
  ignore: z
    .object({
      useGitignore: z.boolean().optional(),
      useDefaultPatterns: z.boolean().optional(),
      customPatterns: z.array(z.string()).optional(),
    })
    .optional(),
  security: z
    .object({
      enableSecurityCheck: z.boolean().optional(),
    })
    .optional(),
  tokenCount: z
    .object({
      encoding: z.string().optional(),
    })
    .optional(),
  ai: z
    .object({
      enabled: z.boolean().optional(),
      provider: z
        .object({
          type: z.enum(['openai', 'anthropic', 'openrouter']).optional(),
          apiKey: z.string().optional(),
          model: z.string().optional(),
          maxTokens: z.number().optional(),
          temperature: z.number().optional(),
        })
        .optional(),
      sections: z
        .object({
          systemLevel: z.array(z.enum([
            'architecture_overview',
            'functional_description',
            'system_requirements',
            'security_analysis',
            'dependency_analysis'
          ])).optional(),
          fileLevel: z.array(z.enum([
            'file_summary',
            'file_role',
            'code_quality_review'
          ])).optional(),
        })
        .optional(),
    })
    .optional(),
});

// Update default config schema
export const repomixConfigDefaultSchema = z.object({
  output: z
    .object({
      filePath: z.string().default(defaultFilePathMap.plain),
      style: repomixOutputStyleSchema.default('plain'),
      parsableStyle: z.boolean().default(false),
      headerText: z.string().optional(),
      instructionFilePath: z.string().optional(),
      fileSummary: z.boolean().default(true),
      directoryStructure: z.boolean().default(true),
      removeComments: z.boolean().default(false),
      removeEmptyLines: z.boolean().default(false),
      topFilesLength: z.number().int().min(0).default(5),
      showLineNumbers: z.boolean().default(false),
      copyToClipboard: z.boolean().default(false),
      includeEmptyDirectories: z.boolean().optional(),
    })
    .default({}),
  include: z.array(z.string()).default([]),
  ignore: z
    .object({
      useGitignore: z.boolean().default(true),
      useDefaultPatterns: z.boolean().default(true),
      customPatterns: z.array(z.string()).default([]),
    })
    .default({}),
  security: z
    .object({
      enableSecurityCheck: z.boolean().default(true),
    })
    .default({}),
  tokenCount: z
    .object({
      encoding: z
        .string()
        .default('o200k_base')
        .transform((val) => val as TiktokenEncoding),
    })
    .default({}),
  ai: z
    .object({
      enabled: z.boolean().default(false),
      provider: z
        .object({
          type: z.enum(['openai', 'anthropic', 'openrouter']).default('openai'),
          model: z.string().default('gpt-4'),
          maxTokens: z.number().default(2048),
          temperature: z.number().default(0.7),
        })
        .default({}),
      sections: z
        .object({
          systemLevel: z.array(z.enum([
            'architecture_overview',
            'functional_description',
            'system_requirements',
            'security_analysis',
            'dependency_analysis'
          ])).default(['architecture_overview']),
          fileLevel: z.array(z.enum([
            'file_summary',
            'file_role',
            'code_quality_review'
          ])).default(['file_summary']),
        })
        .default({}),
    })
    .default({}),
});

export const repomixConfigFileSchema = repomixConfigBaseSchema;

export const repomixConfigCliSchema = repomixConfigBaseSchema;

export const repomixConfigMergedSchema = repomixConfigDefaultSchema
  .and(repomixConfigFileSchema)
  .and(repomixConfigCliSchema)
  .and(
    z.object({
      cwd: z.string(),
    }),
  );

export type RepomixConfigDefault = z.infer<typeof repomixConfigDefaultSchema>;
export type RepomixConfigFile = z.infer<typeof repomixConfigFileSchema>;
export type RepomixConfigCli = z.infer<typeof repomixConfigCliSchema>;
export type RepomixConfigMerged = z.infer<typeof repomixConfigMergedSchema>;

export const defaultConfig = repomixConfigDefaultSchema.parse({});