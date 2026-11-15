/**
 * Docksal for Webship Workspace.
 *
 * The DOCKSAL menu on every project folder that carries a .docksal/ folder: the runtime's verbs as terminal
 * sessions in the project, the up/down caption, the site link, and "Scaffold .docksal/ here (fin config generate)" when a new folder
 * is made. All of it is the container family's surface (@webship.co/workspace-container); this
 * package is the Docksal runtime plus its host install.
 */

import type { PluginApi } from '@webship.co/workspace-plugin-api';
import { registerContainer } from '@webship.co/workspace-container';

import { docksalRuntime } from './lib/runtime';

export { docksalRuntime };

/** The AI items the installer places: agents in ai-agents/, skills in ai-skills/, commands in ai-commands/, prompts in ai-prompts/. */
export const AGENTS: string[] = ['docksal-operator'];
export const SKILLS: string[] = ['docksal-menu'];
export const AI_COMMANDS: string[] = ['docksal-status'];
export const PROMPTS: string[] = ['docksal-up-and-check'];

export function register(api: PluginApi): void {
  registerContainer(api, docksalRuntime);
}
