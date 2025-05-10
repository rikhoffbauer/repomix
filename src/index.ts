// ---------------------------------------------------------------------------------------------------------------------
// Core
// ---------------------------------------------------------------------------------------------------------------------
export { pack } from './core/packager.js';
export type { PackResult } from './core/packager.js';

// File
export { collectFiles } from './core/file/fileCollect.js';
export { sortPaths } from './core/file/filePathSort.js';
export { processFiles } from './core/file/fileProcess.js';
export { searchFiles } from './core/file/fileSearch.js';
export type { FileSearchResult } from './core/file/fileSearch.js';
export { generateFileTree } from './core/file/fileTreeGenerate.js';

// Security
export { runSecurityCheck } from './core/security/securityCheck.js';
export type { SuspiciousFileResult } from './core/security/securityCheck.js';

// Token Count
export { TokenCounter } from './core/metrics/TokenCounter.js';

// Tree-sitter
export { parseFile } from './core/treeSitter/parseFile.js';

// ---------------------------------------------------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------------------------------------------------
export { loadFileConfig, mergeConfigs } from './config/configLoad.js';
export type { RepomixConfigFile as RepomixConfig } from './config/configSchema.js';
export { defaultIgnoreList } from './config/defaultIgnore.js';

// ---------------------------------------------------------------------------------------------------------------------
// Shard
// ---------------------------------------------------------------------------------------------------------------------
export { setLogLevel } from './shared/logger.js';
export type { RepomixProgressCallback } from './shared/types.js';

// ---------------------------------------------------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------------------------------------------------
export { run as cli } from './cli/cliRun.js';
export type { CliOptions } from './cli/types.js';

// Run CLI Repomix
export { runCli } from './cli/cliRun.js';

// Init action
export { runInitAction } from './cli/actions/initAction.js';

// Default action
export { runDefaultAction, buildCliConfig } from './cli/actions/defaultAction.js';

// Remote action
export {
  isValidRemoteValue,
  runRemoteAction,
} from './cli/actions/remoteAction.js';
