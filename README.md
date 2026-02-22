# Inconsequential Thinking

> [!TIP]
> A lightweight MCP (Model Context Protocol) server that integrates sequential thinking capabilities with personal Claude slash commands.

---

## Overview

This MCP server processes sequential thoughts from Claude and recommends relevant slash commands at each step. It's designed to enhance problem-solving workflows by providing context-aware command suggestions based on thought content.

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/JasonWarrenUK/inconsequential-thinking)

---

## Features

- **Sequential Thought Processing**: Tracks and analyzes thoughts in sequence
- **Smart Command Recommendations**: Suggests relevant slash commands based on keyword matching
- **In-Memory State Management**: Maintains last 50 thoughts for context
- **Confidence Scoring**: Ranks recommendations by relevance (0.0 to 1.0 scale)
- **Zero Runtime Dependencies**: Minimal footprint with only `mcp-lite` and `zod`

---

## Available Slash Commands

The server recommends from the following personal slash commands:

- `/plan:create` - Create implementation plans
- `/analyse:project:analyse` - Analyze codebase structure
- `/analyse:project:crit` - Find project weaknesses
- `/task:execute:minima` - Execute tasks with minimal changes
- `/task:suggest:targeted` - Suggest next logical tasks
- `/style:layout:fix` - Fix UI layout issues
- `/style:style:unify` - Unify component styling
- `/git:pull-request` - Create pull requests

---

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd inconsequential-thinking

# Install dependencies
npm install

# Build the project
npm run build
```

---

## Usage

### Development Mode

```bash
npm run dev
```

This starts the server with hot reload enabled using `tsx watch`.

### Production Mode

```bash
# Build first
npm run build

# Start the server
npm start
```

### Environment Variables

- `PORT` - Server port (default: 3000)

## MCP Tool: `inconsequential_thinking`

### Input Schema

```typescript
{
  thought: string;              // Current thought text
  thought_number: number;       // Sequence number (1, 2, 3, ...)
  total_thoughts: number;       // Estimated total thoughts needed
  next_thought_needed: boolean; // Whether more thoughts are coming
}
```

### Output Schema

```typescript
{
  recommended_commands: [
    {
      command: string;      // e.g., "/plan:create"
      confidence: number;   // 0.0 to 1.0
      rationale: string;    // Why this command is recommended
      priority: number;     // Ranking (1 = highest)
    }
  ],
  context_summary: string;         // Summary of thought history
  next_step_suggestions: string[]; // Suggested next actions
}
```

---

## Architecture

### Project Structure

```
inconsequential-thinking/
| src/
|    index.ts          # MCP server entry point
|    types.ts          # TypeScript type definitions
|    commands.ts       # Slash command catalog
| docs/
|    Initial-Idea.md
|    MVP-Definition.md
| package.json
| tsconfig.json
| README.md
```

### Key Components

**Command Catalog** (`commands.ts`):
- Maintains metadata for all slash commands
- Provides keyword mappings for matching algorithm

**Thought History**:
- In-memory storage (last 50 thoughts)
- FIFO eviction when limit reached
- Used for context-aware recommendations

**Matching Algorithm**:
- Keyword extraction from thoughts
- Relevance scoring against command keywords
- Confidence-based ranking

---

## Configuration

### Memory Limit

By default, the server retains the last 50 thoughts. To modify:

```typescript
// In src/index.ts
const MEMORY_LIMIT = 50; // Change to desired limit
```

### Adding New Commands

Edit `src/commands.ts` and add a new entry to the `SLASH_COMMANDS` array:

```typescript
{
  name: '/your:command',
  description: 'What your command does',
  useWhen: 'When to use this command',
  keywords: ['keyword1', 'keyword2', 'keyword3']
}
```

---

## Development

### Type Checking

```bash
npm run typecheck
```

### Testing

Connect to the server using MCP Inspector or any MCP client:

```bash
# In one terminal
npm run dev

# In another terminal, use your MCP client to connect to http://localhost:3000
```

---

## Performance

- Response time: <100ms for thought processing
- Memory usage: <50MB for server process
- Startup time: <2 seconds

---

## Limitations (MVP)

- In-memory only (no persistence across restarts)
- Simple keyword-based matching (no ML/NLP)
- No branching or revision support
- Single-user only (no session management)
- Fixed confidence threshold (20%)

---

## Roadmap

See [docs/MVP-Definition.md](docs/MVP-Definition.md) for detailed future enhancement plans including:

- v1.1: Persistent storage with SQLite
- v1.2: Command parameter suggestions
- v2.0: ML-based command prediction

---

## Inspiration

Based on [mcp-sequentialthinking-tools](https://github.com/spences10/mcp-sequentialthinking-tools) by Spencer

---

## License

MIT

---

## Contributing

This is a personal project for integrating with custom slash commands. Feel free to fork and adapt to your own command suite.
