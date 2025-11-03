/**
 * Type definitions for inconsequential-thinking MCP server
 */

/**
 * Represents a single slash command with metadata
 */
export interface SlashCommand {
  /** Command name (e.g., "/plan:create") */
  name: string;
  /** Description of what the command does */
  description: string;
  /** Context for when to use this command */
  useWhen: string;
  /** Keywords for matching algorithm */
  keywords: string[];
}

/**
 * A single thought in the sequential thinking process
 */
export interface Thought {
  /** The thought text content */
  text: string;
  /** Sequence number of this thought */
  number: number;
  /** Total estimated thoughts */
  totalEstimate: number;
  /** Timestamp when thought was recorded */
  timestamp: Date;
}

/**
 * A recommended command with confidence scoring
 */
export interface CommandRecommendation {
  /** The slash command to recommend */
  command: string;
  /** Confidence score (0.0 to 1.0) */
  confidence: number;
  /** Explanation for why this command is recommended */
  rationale: string;
  /** Priority ranking (1 = highest) */
  priority: number;
}

/**
 * Response structure from the inconsequential_thinking tool
 */
export interface ThinkingResponse {
  /** List of recommended commands */
  recommended_commands: CommandRecommendation[];
  /** Summary of the current context */
  context_summary: string;
  /** Suggestions for next steps */
  next_step_suggestions: string[];
}
