/**
 * Catalog of personal slash commands with metadata
 */

import type { SlashCommand } from './types.js';

/**
 * Complete catalog of available slash commands
 */
export const SLASH_COMMANDS: SlashCommand[] = [
  {
    name: '/plan:create',
    description: 'Create an implementation plan based on user input and project context',
    useWhen: 'When starting a new feature or complex task that requires planning',
    keywords: ['plan', 'design', 'architecture', 'implementation', 'approach', 'strategy', 'feature', 'project']
  },
  {
    name: '/analyse:project:analyse',
    description: 'Provide a detailed high-level overview of the codebase',
    useWhen: 'When you need to understand the structure and organization of a project',
    keywords: ['analyze', 'overview', 'structure', 'codebase', 'project', 'understand', 'explore', 'architecture']
  },
  {
    name: '/analyse:project:crit',
    description: 'Probe the project for weaknesses and issues',
    useWhen: 'When looking for bugs, code smells, or areas that need improvement',
    keywords: ['critique', 'weakness', 'bug', 'issue', 'problem', 'smell', 'review', 'quality', 'improve']
  },
  {
    name: '/task:execute:minima',
    description: 'Achieve a goal with a minimalist approach',
    useWhen: 'When you want the simplest possible solution with minimal changes',
    keywords: ['minimal', 'simple', 'quick', 'basic', 'straightforward', 'least', 'small', 'change']
  },
  {
    name: '/task:suggest:targeted',
    description: 'Suggest the next logical task based on codebase examination',
    useWhen: 'When you are unsure what to work on next or need direction',
    keywords: ['next', 'suggest', 'recommend', 'what', 'should', 'task', 'todo', 'direction']
  },
  {
    name: '/style:layout:fix',
    description: 'Fix layout problems whilst considering knock-on effects',
    useWhen: 'When UI layout is broken or components are misaligned',
    keywords: ['layout', 'ui', 'style', 'css', 'alignment', 'positioning', 'display', 'fix', 'visual']
  },
  {
    name: '/style:style:unify',
    description: 'Edit the styling of a component to make it fit the rest of the project',
    useWhen: 'When a component looks inconsistent with the rest of the UI',
    keywords: ['style', 'consistent', 'theme', 'unify', 'match', 'design', 'look', 'feel', 'ui']
  },
  {
    name: '/git:pull-request',
    description: 'Create a pull request for the current branch',
    useWhen: 'When code is ready to be reviewed and merged',
    keywords: ['pull', 'request', 'pr', 'merge', 'review', 'git', 'commit', 'ready', 'submit']
  }
];

/**
 * Lookup a command by name
 */
export function findCommandByName(name: string): SlashCommand | undefined {
  return SLASH_COMMANDS.find(cmd => cmd.name === name);
}

/**
 * Get all command names as an array
 */
export function getAllCommandNames(): string[] {
  return SLASH_COMMANDS.map(cmd => cmd.name);
}
