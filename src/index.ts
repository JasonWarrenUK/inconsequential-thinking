/** Inconsequential Thinking MCP Server
 * A lightweight MCP server that integrates sequential thinking capabilities
 * with personal Claude slash commands.
 */

import { McpServer } from 'mcp-lite';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import type { Thought, ThinkingResponse } from './types.js';
import { SLASH_COMMANDS } from './commands.js';

// In-memory storage for thought history
const MEMORY_LIMIT = 50;
const thoughtHistory: Thought[] = [];

/** Input schema for the inconsequential_thinking tool */
const ThinkingInputSchema = z.object({
  thought: z.string().describe('The current thought text'),
  thought_number: z.number().int().positive().describe('Current thought number'),
  total_thoughts: z.number().int().positive().describe('Estimated total thoughts needed'),
  next_thought_needed: z.boolean().describe('Whether another thought is needed')
});

type ThinkingInput = z.infer<typeof ThinkingInputSchema>;

/** Add a thought to history and manage memory limit */
function recordThought(thought: string, number: number, totalEstimate: number): void {
  thoughtHistory.push({
    text: thought,
    number,
    totalEstimate,
    timestamp: new Date()
  });

  // Enforce memory limit (FIFO eviction)
  while (thoughtHistory.length > MEMORY_LIMIT) {
    thoughtHistory.shift();
  }
}

/** Extract keywords from thought text for matching */
function extractKeywords(text: string): string[] {
  // Convert to lowercase and split on word boundaries
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];

  // Filter out common stop words
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'was', 'are', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'we', 'they', 'it']);

  return words.filter(word => !stopWords.has(word) && word.length > 2);
}

/** Calculate relevance score between thought keywords and command keywords */
function calculateRelevance(thoughtKeywords: string[], commandKeywords: string[]): number {
  const matches = thoughtKeywords.filter(tk =>
    commandKeywords.some(ck => ck.includes(tk) || tk.includes(ck))
  );

  if (matches.length === 0) return 0;

  // Score based on percentage of thought keywords matched and absolute count
  const percentageMatch = matches.length / thoughtKeywords.length;
  const absoluteBonus = Math.min(matches.length / 5, 0.3); // Cap bonus at 0.3

  return Math.min(percentageMatch + absoluteBonus, 1.0);
}

/** Analyze thought and recommend relevant commands */
function analyzeAndRecommend(thought: string): ThinkingResponse {
  const thoughtKeywords = extractKeywords(thought);

  // Score each command
  const scoredCommands = SLASH_COMMANDS.map(cmd => ({
    command: cmd.name,
    confidence: calculateRelevance(thoughtKeywords, cmd.keywords),
    rationale: cmd.description,
    useWhen: cmd.useWhen
  }))
  .filter(scored => scored.confidence > 0.2) // Only include commands with >20% confidence
  .sort((a, b) => b.confidence - a.confidence) // Sort by confidence descending
  .slice(0, 3) // Take top 3
  .map((scored, index) => ({
    command: scored.command,
    confidence: scored.confidence,
    rationale: `${scored.rationale}. ${scored.useWhen}`,
    priority: index + 1
  }));

  // Generate context summary
  const recentThoughts = thoughtHistory.slice(-5);
  const contextSummary = recentThoughts.length > 0
    ? `Based on ${thoughtHistory.length} previous thought(s), you are working through a sequential problem-solving process.`
    : 'Starting a new sequential thinking session.';

  // Generate next step suggestions
  const nextStepSuggestions: string[] = [];
  if (scoredCommands.length > 0) {
    nextStepSuggestions.push(`Consider using ${scoredCommands[0].command} to proceed.`);
  }
  if (thoughtHistory.length > 3) {
    nextStepSuggestions.push('You have accumulated context from previous thoughts - use this to inform your next step.');
  }

  return {
    recommended_commands: scoredCommands,
    context_summary: contextSummary,
    next_step_suggestions: nextStepSuggestions
  };
}

/** Create and configure the MCP server */
const mcp = new McpServer({
  name: 'inconsequential-thinking',
  version: '0.1.0',
  schemaAdapter: (schema) => zodToJsonSchema(schema as z.ZodType),
});

// Register the main tool
mcp.tool('inconsequential_thinking', {
  description: 'Process sequential thoughts and recommend relevant slash commands based on thought content',
  inputSchema: ThinkingInputSchema,
  outputSchema: z.object({
    recommended_commands: z.array(z.object({
      command: z.string(),
      confidence: z.number(),
      rationale: z.string(),
      priority: z.number()
    })),
    context_summary: z.string(),
    next_step_suggestions: z.array(z.string())
  }),
  handler: (args: ThinkingInput) => {
    // Record the thought
    recordThought(args.thought, args.thought_number, args.total_thoughts);

    // Analyze and generate recommendations
    const response = analyzeAndRecommend(args.thought);

    // Return formatted response
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(response, null, 2)
        }
      ],
      structuredContent: response
    };
  }
});

console.log(`Inconsequential Thinking MCP Server initialized`);
console.log(`Memory limit: ${MEMORY_LIMIT} thoughts`);
console.log(`Available commands: ${SLASH_COMMANDS.length}`);

export default mcp;
