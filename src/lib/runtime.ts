/**
 * Docksal, as a container runtime: a project with a .docksal/ folder.
 */

import fs from 'fs';
import path from 'path';
import type { ContainerProject, ContainerRuntime } from '@webship.co/workspace-container';

export const docksalRuntime: ContainerRuntime = {
  id: 'docksal',
  label: 'DOCKSAL',
  title: 'Docksal',
  cli: 'fin',
  cliHint: 'https://docs.docksal.io/getting-started/setup/',
  detect: (dir): ContainerProject | null => {
    const file = ['.docksal/docksal.env', '.docksal/docksal.yml'].find((f) => fs.existsSync(path.join(dir, f)));
    if (!file) return null;
    let host = '';
    try { host = (fs.readFileSync(path.join(dir, '.docksal', 'docksal.env'), 'utf8').match(/^VIRTUAL_HOST=["']?([\w.-]+)/m) || [])[1] || ''; } catch (_) { /* no env file */ }
    const name = path.basename(dir);
    return { file, name, url: `http://${host || `${name}.docksal.site`}` };
  },
  state: async (_p, dir, lib) => {
    const out = await lib.run('fin', ['project', 'status'], dir, { timeoutMs: 20 * 1000 });
    if (!out.ok) return 'unknown';
    return /\bUp\b/.test(String(out.stdout)) ? 'up' : 'down';
  },
  verbs: {
    start: { label: 'Start', icon: 'play', kind: 'start', cmd: () => 'fin project start' },
    stop: { label: 'Stop', icon: 'ban', kind: 'stop', cmd: () => 'fin project stop' },
    restart: { label: 'Restart', icon: 'refresh', kind: 'restart', cmd: () => 'fin project restart' },
    status: { label: 'Status', icon: 'info', kind: 'status', cmd: () => 'fin project status' },
    logs: { label: 'Logs (follow)', icon: 'file-text', kind: 'logs', cmd: () => 'fin logs -f' },
    shell: { label: 'Shell (fin bash)', icon: 'terminal', kind: 'shell', cmd: () => 'fin bash' },
    init: { label: 'Run the project init (fin init)', icon: 'bolt', kind: 'other', cmd: () => 'fin init' },
    remove: { label: 'Remove (containers and data)', icon: 'trash', kind: 'other', danger: true, cmd: () => 'fin project remove -f' },
  },
  init: { label: 'Scaffold .docksal/ here (fin config generate)', cmd: () => 'fin config generate', help: 'Docksal writes .docksal/docksal.env with the default stack.' },
  menuNote: 'Every verb opens a terminal in the project',
};
