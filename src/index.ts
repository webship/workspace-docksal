/**
 * Docksal for Webship Workspace.
 *
 * The DOCKSAL menu on every project folder that carries a .docksal/ folder: the runtime's verbs as terminal
 * sessions in the project, the up/down caption, the site link, and "Scaffold .docksal/ here (fin config generate)" when a new folder
 * is made. All of it is the container family's surface (@webship/workspace-container); this
 * package is the Docksal runtime plus its host install.
 */

import type { PluginApi } from '@webship/workspace-plugin-api';
import { registerContainer } from '@webship/workspace-container';

import { docksalRuntime } from './lib/runtime';

export { docksalRuntime };

export function register(api: PluginApi): void {
  registerContainer(api, docksalRuntime);
}
