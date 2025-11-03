# Inconsequential Thinking - MVP Definition

**Version:** 1.0
**Date:** November 3, 2025
**Status:** Planning Phase

---

## Executive Summary

Build a minimal MCP (Model Context Protocol) server that integrates sequential thinking capabilities with personal Claude slash commands. This MVP is inspired by `mcp-sequentialthinking-tools` but streamlined to focus on command recommendation rather than complex reasoning workflows.

**Development Target:** 3-4 hours
**Core Value:** Enable Claude to intelligently recommend relevant slash commands during sequential problem-solving

---

## Project Goal

Create a lightweight MCP server that:
1. Accepts sequential thoughts from Claude
2. Analyzes thought content to understand user intent
3. Recommends relevant personal slash commands at each step
4. Provides context-aware guidance for next steps

---

## Scope Definition

### ✅ In Scope (MVP Features)

#### 1. Single MCP Tool
- **Tool Name:** `inconsequential_thinking`
- **Purpose:** Process sequential thoughts and recommend slash commands
- **Inputs:**
  - Current thought text
  - Thought number and total estimate
  - Flag for whether more thoughts are needed
- **Outputs:**
  - Recommended slash commands with confidence scores
  - Rationale for each recommendation
  - Suggested next steps

#### 2. Slash Command Integration
- Maintain catalog of personal slash commands
- Store metadata: name, description, use cases
- Simple keyword-based matching algorithm
- Confidence scoring (0.0 to 1.0 scale)

#### 3. Basic State Management
- In-memory thought history
- Track last 50 thoughts (configurable)
- Provide previous thoughts as context
- Automatic memory trimming when limit reached

#### 4. Minimal Server Infrastructure
- Built with `mcp-lite` framework
- Single TypeScript file for core logic
- HTTP + SSE transport protocol
- Zero runtime dependencies (except mcp-lite)
- Development mode with hot reload

### ❌ Explicitly Out of Scope

The following features are intentionally excluded from the MVP to maintain focus:

- Complex branching/revision logic
- Persistent storage (database or file system)
- Multi-user support or sessions
- Integration with mcp-gateway
- Advanced NLP or ML-based matching
- Hypothesis generation/verification workflows
- Automatic tool parameter suggestion
- Web dashboard or UI
- Analytics, metrics, or logging
- Authentication or authorization
- Rate limiting or quotas

---

## Technical Architecture

### Technology Stack

**Core Framework:**
- `mcp-lite` - Lightweight MCP server implementation
- TypeScript - Type-safe development
- Zod or Valibot - Schema validation

**Build Tools:**
- tsx or ts-node - Development execution
- TypeScript compiler - Production builds

**No Additional Dependencies:**
- Zero runtime dependencies beyond mcp-lite
- Standard Node.js APIs only

### Project Structure

```
inconsequential-thinking/
├── docs/
│   ├── Initial-Idea.md
│   └── MVP-Definition.md (this file)
├── src/
│   ├── index.ts          # MCP server entry point
│   ├── types.ts          # TypeScript type definitions
│   └── commands.ts       # Slash command catalog
├── package.json
├── tsconfig.json
└── README.md
```

### Key Components

**1. Command Catalog (`commands.ts`)**
```typescript
interface SlashCommand {
  name: string;           // e.g., "/plan:create"
  description: string;    // What the command does
  useWhen: string;       // When to use this command
  keywords: string[];    // Keywords for matching
}
```

**2. Core Tool (`index.ts`)**
- Input validation using Zod schema
- Thought analysis and keyword extraction
- Command matching and scoring
- Response formatting with recommendations

**3. State Manager**
- Simple in-memory array of thoughts
- FIFO eviction when memory limit reached
- Context retrieval for analysis

---

## Implementation Plan

### Phase 1: Project Setup (30 minutes)

**Tasks:**
1. Create `package.json` with mcp-lite dependency
2. Configure TypeScript with `tsconfig.json`
3. Create project directory structure
4. Set up development scripts (build, dev, start)
5. Initialize git repository (optional)

**Deliverables:**
- Runnable TypeScript project
- Development environment configured

---

### Phase 2: Define Slash Commands (20 minutes)

**Tasks:**
1. Create `commands.ts` file
2. Define TypeScript interfaces for commands
3. Build catalog of personal slash commands:
   - `/plan:create` - Create implementation plans
   - `/analyse:project:analyse` - Analyze codebase
   - `/analyse:project:crit` - Find weaknesses
   - `/task:execute:minima` - Minimalist task execution
   - `/task:suggest:targeted` - Suggest next tasks
   - `/style:layout:fix` - Fix layout issues
   - `/style:style:unify` - Unify component styling
   - `/git:pull-request` - Create pull requests
4. Add keywords for each command
5. Export command lookup utilities

**Deliverables:**
- Complete command catalog
- Utility functions for command lookup

---

### Phase 3: Core Tool Implementation (1 hour)

**Tasks:**
1. Define input schema with Zod:
   ```typescript
   {
     thought: string
     thought_number: number
     total_thoughts: number
     next_thought_needed: boolean
   }
   ```
2. Implement keyword extraction from thought text
3. Build matching algorithm:
   - Extract keywords from thought
   - Compare against command keywords
   - Calculate relevance scores
   - Rank by confidence
4. Format structured output:
   ```typescript
   {
     recommended_commands: [
       {
         command: string
         confidence: number
         rationale: string
         priority: number
       }
     ]
     context_summary: string
     next_step_suggestions: string[]
   }
   ```

**Deliverables:**
- Working `inconsequential_thinking` tool
- Command recommendation logic
- Structured output generation

---

### Phase 4: State Management (30 minutes)

**Tasks:**
1. Create in-memory thought history array
2. Implement thought storage on each call
3. Add memory limit enforcement (50 thoughts)
4. Build context retrieval function
5. Use previous thoughts to improve recommendations

**Deliverables:**
- Working memory management
- Context-aware recommendations

---

### Phase 5: Server Setup (20 minutes)

**Tasks:**
1. Initialize mcp-lite server in `index.ts`
2. Register the tool with server
3. Configure HTTP + SSE transport
4. Add error handling and logging
5. Create server startup script

**Deliverables:**
- Functional MCP server
- Server starts and responds to requests

---

### Phase 6: Testing & Validation (30 minutes)

**Test Scenarios:**

1. **Planning Workflow:**
   - Thought 1: "I need to build a new feature"
   - Expected: Recommend `/plan:create`

2. **Analysis Workflow:**
   - Thought 1: "What are the weaknesses in this codebase?"
   - Expected: Recommend `/analyse:project:crit`

3. **Execution Workflow:**
   - Thought 1: "Let's implement this with minimal changes"
   - Expected: Recommend `/task:execute:minima`

4. **Memory Limit:**
   - Send 51 thoughts
   - Verify only last 50 are retained

**Tasks:**
1. Test with MCP Inspector or simple client
2. Verify recommendations are relevant
3. Check memory management works
4. Document edge cases and limitations

**Deliverables:**
- Test results documentation
- List of known issues

---

### Phase 7: Documentation (20 minutes)

**Tasks:**
1. Create comprehensive `README.md`:
   - Project overview
   - Installation instructions
   - Usage examples
   - Configuration options
   - Known limitations
2. Add inline code comments
3. Document command catalog format
4. Create example client usage

**Deliverables:**
- User-facing documentation
- Developer documentation

---

## Success Criteria

The MVP is considered complete when:

1. ✅ Server starts without errors
2. ✅ Tool accepts thought sequences and returns valid responses
3. ✅ Slash commands are correctly matched to thought content
4. ✅ At least 3 commands are recommended with >0.5 confidence for relevant thoughts
5. ✅ Memory limit prevents unbounded growth (verified with 51+ thoughts)
6. ✅ README documents installation and usage
7. ✅ All 4 test scenarios pass successfully

---

## Non-Functional Requirements

### Performance
- Response time: <100ms for thought processing
- Memory usage: <50MB for server process
- Startup time: <2 seconds

### Code Quality
- TypeScript strict mode enabled
- Core logic in single file (<300 lines preferred)
- No external API calls (except MCP protocol)
- Clear error messages for invalid inputs

### Maintainability
- Inline comments for complex logic
- Type definitions for all public interfaces
- Simple algorithm that can be easily modified

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Keyword matching too simplistic | High | Medium | Accept for MVP, plan ML-based matching for v2 |
| Memory leaks from unbounded history | Medium | High | Implement strict memory limit with testing |
| mcp-lite lacks needed features | Low | High | Review mcp-lite docs thoroughly before starting |
| Slash command catalog becomes stale | Medium | Low | Document update process clearly |

---

## Future Enhancements (Post-MVP)

After validating the MVP, consider these additions:

### Version 1.1
- Persistent storage with SQLite adapter
- Configuration file for command catalog
- More sophisticated keyword matching (TF-IDF)

### Version 1.2
- Command parameter suggestions
- Integration with mcp-gateway
- Support for command chaining recommendations

### Version 2.0
- Machine learning-based command prediction
- Branching/revision support from original sequentialthinking
- Multi-user session management
- Web dashboard for monitoring

---

## Resources

### Inspiration
- [mcp-sequentialthinking-tools](https://github.com/spences10/mcp-sequentialthinking-tools) - Original sequential thinking MCP server

### Technology
- [mcp-lite](https://github.com/fiberplane/mcp-lite) - Lightweight MCP framework
- [Model Context Protocol](https://modelcontextprotocol.io/) - Official MCP documentation

### Personal Slash Commands
- Located in `.claude/commands/` directory
- Organized by category (plan, analyse, task, style, git)

---

## Timeline

**Total Estimated Time:** 3-4 hours

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| 1. Project Setup | 30 min | None |
| 2. Define Commands | 20 min | Phase 1 |
| 3. Core Tool | 60 min | Phase 1, 2 |
| 4. State Management | 30 min | Phase 3 |
| 5. Server Setup | 20 min | Phase 3, 4 |
| 6. Testing | 30 min | Phase 5 |
| 7. Documentation | 20 min | All phases |

**Recommended Schedule:**
- Day 1: Phases 1-3 (2 hours)
- Day 2: Phases 4-7 (2 hours)

---

## Glossary

**MCP (Model Context Protocol):** Standard protocol for connecting AI models to external tools and data sources

**Slash Command:** Personal Claude Code command starting with `/` that performs specific development tasks

**Sequential Thinking:** Problem-solving approach that breaks complex tasks into ordered, manageable steps

**mcp-lite:** Minimal TypeScript framework for building MCP servers with zero runtime dependencies

**Confidence Score:** Numeric value (0.0-1.0) indicating how relevant a command is to the current thought

**Thought:** Single step in a sequential problem-solving process, represented as text input

---

## Approval & Sign-off

- [ ] MVP scope reviewed and approved
- [ ] Technical approach validated
- [ ] Timeline accepted
- [ ] Success criteria agreed upon

**Ready to Begin Implementation:** [ ]

---

*This document defines the narrow scope for the initial MVP. All features are intentionally minimal to enable rapid validation of the core concept before investing in advanced capabilities.*
