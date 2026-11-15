# @webship.co/workspace-docksal

Docksal for the [Webship Workspace](https://github.com/webship/workspace) dashboard: the **DOCKSAL**
menu on every project folder that carries a .docksal/ folder, with the runtime's verbs as terminal sessions in
the project, the up/down caption and the site link, and "Scaffold .docksal/ here (fin config generate)" when a new folder is made.
A runtime of [`@webship.co/workspace-container`](https://github.com/webship/workspace-container).

A project is a Docksal project when it carries `.docksal/` (`docksal.env` or `docksal.yml`); the site link is `VIRTUAL_HOST` from `docksal.env`, or `<folder>.docksal.site`.

## Use it

```bash
cd ~/workspace
bash core/scripts/plugins.sh --require github:webship/workspace-docksal
bash core/scripts/plugins.sh --activate docksal --with-needs
bash core/scripts/plugins.sh --install docksal
```

## The items it carries

The workspace is container-based (DDEV by default). Each item lands in the folder of its kind, when
that folder is an active workspace folder, is listed there like any other item, and is installed
into Claude Code from there:

| What | Lands in | What it is for |
| --- | --- | --- |
| The agent `docksal-operator` | `ai-agents/` | Says whether a Docksal project is up, starts, stops and restarts it with the commands of the DOCKSAL menu, and never runs the destroying one on its own |
| The skill `docksal-menu` | `ai-skills/` | Which folder is a Docksal project, every entry of the DOCKSAL menu and its `fin` command, the caption, the site link, the New folder option |
| The command `/docksal-status` | `ai-commands/` | `/docksal-status <project>`: whether it is a Docksal project and whether it is up. Read-only |
| The prompt `docksal-up-and-check` | `ai-prompts/` | The launch command of a session that starts a Docksal project and says whether it came up |

The plugin places no `cmd-*.sh`: every entry of the menu is one `fin` command in the project's folder, and a wrapper would add nothing to it. The item bodies are plain Markdown any AI command-line assistant can follow; Claude Code is the default shape (frontmatter, the launch command of the prompt).

How the items are laid out and checked: [docs/plugin-items-pattern.md](docs/plugin-items-pattern.md).

## What it needs

On the machine this plugin needs `fin` (https://docs.docksal.io/getting-started/setup/), and its manifest says so (`needs.commands`). The workspace reports it and never installs it:

```bash
bash core/scripts/plugins.sh --check docksal      # found, with its version, or missing, with how to install it
webship-workspace doctor                        # the same for the core and every plugin
```

It also needs the AI folders its items are placed in (`needs`): `ai-agents`, `ai-skills`, `ai-commands` and `ai-prompts`. `--require` says so, `--activate` and `--install` stop until the workspace has them, and `--with-needs` adds what is missing first. A kind whose folder is not an active workspace folder is skipped, and the install says so. It needs no sites folder: its menu is on the project rows of whatever folders the workspace has.

## The verbs

| Verb | Command |
| --- | --- |
| Start | `fin project start` |
| Stop | `fin project stop` |
| Restart | `fin project restart` |
| Status | `fin project status` |
| Logs | `fin logs -f` |
| Shell | `fin bash` |
| Init | `fin init` (the project's own init command) |
| Remove | `fin project remove -f` (containers and data: marked in red) |

Every verb opens a terminal session in the project folder, so what the CLI prints is what you see,
and a verb that asks a question can be answered.

The `workspacePlugin` block in `package.json` is the manifest the installer reads.

## What the package holds of them

| Path | What it is |
| --- | --- |
| `ai/agents/docksal-operator.md` | The agent `docksal-operator` |
| `ai/skills/docksal-menu/` | The skill `docksal-menu` |
| `ai/commands/docksal-status.md` | The command `/docksal-status` |
| `ai/prompts/docksal-up-and-check.md` | The prompt `docksal-up-and-check` |
| `tests/items.test.ts` | The shape of every item, and that it names nothing the plugin does not have |
