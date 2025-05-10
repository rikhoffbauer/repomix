# Configuration

## Quick Start

Create configuration file:
```bash
repomix --init
```

## Configuration File

`repomix.config.json`:
```json
{
  "output": {
    "filePath": "repomix-output.xml",
    "style": "xml",
    "parsableStyle": true,
    "compress": false,
    "headerText": "Custom header text",
    "instructionFilePath": "repomix-instruction.md",
    "fileSummary": true,
    "directoryStructure": true,
    "removeComments": false,
    "removeEmptyLines": false,
    "topFilesLength": 5,
    "showLineNumbers": false,
    "copyToClipboard": false,
    "includeEmptyDirectories": false,
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100
    }
  },
  "include": ["**/*"],
  "ignore": {
    "useGitignore": true,
    "useDefaultPatterns": true,
    "customPatterns": ["tmp/", "*.log"]
  },
  "security": {
    "enableSecurityCheck": true
  }
}
```

## Global Configuration

Create global configuration:
```bash
repomix --init --global
```

Location:
- Windows: `%LOCALAPPDATA%\Repomix\repomix.config.json`
- macOS/Linux: `~/.config/repomix/repomix.config.json`

## Ignore Patterns

Priority:
1. CLI options (`--ignore`)
2. `.repomixignore`
3. `.gitignore` and `.git/info/exclude`
4. Default patterns

`.repomixignore` example:
```text
# Cache directories
.cache/
tmp/

# Build outputs
dist/
build/

# Logs
*.log
```

## Default Ignore Patterns

Common patterns included by default:
```text
node_modules/**
.git/**
coverage/**
dist/**
```

Full list: [defaultIgnore.ts](https://github.com/yamadashy/repomix/blob/main/src/config/defaultIgnore.ts)

## Examples

### Code Compression

When `output.compress` is set to `true`, Repomix will intelligently extract essential code structures while removing implementation details. This helps reduce token count while maintaining important structural information.

For more details and examples, see [Code Compression Guide](code-compress).

### Git Integration

The `output.git` configuration allows you to control how files are sorted based on Git history and include Git diffs:

- `sortByChanges`: When set to `true`, files are sorted by the number of Git changes (commits that modified the file). Files with more changes appear at the bottom of the output. This can help prioritize more actively developed files. Default: `true`
- `sortByChangesMaxCommits`: The maximum number of commits to analyze when counting file changes. Default: `100`
- `includeDiffs`: When set to `true`, includes Git diffs in the output (includes both work tree and staged changes separately). This allows the reader to see pending changes in the repository. Default: `false`

Example configuration:
```json
{
  "output": {
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100,
      "includeDiffs": true
    }
  }
}
```

### Comment Removal

When `output.removeComments` is set to `true`, Repomix will remove comments from supported file types to reduce the output size and focus on essential code content.

For supported languages and detailed examples, see [Comment Removal Guide](comment-removal).
