---
name: docksal-menu
description: Run a project of a Webship Workspace on Docksal through the Docksal plugin (`@webship.co/workspace-docksal`) — which folder is a Docksal project, every entry of the DOCKSAL menu and the `fin` command behind it, the up or down caption, the site link, the option the New folder form offers, and how to check that `fin` is on the machine. Use when asked "is this a Docksal project", "what does the DOCKSAL menu do", "start this project", "why is there no DOCKSAL menu on this project", "the caption says ?", or when a project of the workspace that carries a `.docksal/` folder.
argument-hint: '<project>'
---

# docksal-menu

Docksal for a project of a Webship Workspace (`~/workspace`, container-based, DDEV by default). It
comes with the Docksal plugin (`@webship.co/workspace-docksal`), a runtime of the container family
(`@webship.co/workspace-container`), like the agent `docksal-operator`, the command `/docksal-status` and
the prompt `docksal-up-and-check`.

The workspace builds its own sites on DDEV. This plugin is for a project that runs on Docksal
instead: it gives that project a menu of its own, beside the others.

## Which project gets the menu

A project is a Docksal project when its folder carries `.docksal/docksal.env` or `.docksal/docksal.yml`. The name of the project is the folder's name. The command-line tool of Docksal is `fin`.

```bash
cd ~/workspace/<folder>/<project>
ls .docksal/docksal.env .docksal/docksal.yml 2>/dev/null
```

## The DOCKSAL menu

On top the menu shows the name of the project and the file it was recognised by, and **Open the site**: the `VIRTUAL_HOST` of `.docksal/docksal.env`, or `http://<folder>.docksal.site`. Every
other entry opens a terminal session in the project's folder and runs one command there, so what
`fin` prints is what is seen, and a question it asks can be answered.

| Menu entry | The command, in the project's folder |
| --- | --- |
| **Start** | `fin project start` |
| **Stop** | `fin project stop` |
| **Restart** | `fin project restart` |
| **Status** | `fin project status` |
| **Logs (follow)** | `fin logs -f` |
| **Shell (fin bash)** | `fin bash` |
| **Run the project init (fin init)** | `fin init` |
| **Remove (containers and data)** | `fin project remove -f` |

The menu ends with the note "Every verb opens a terminal in the project".

### The caption beside the menu

| Caption | What it means |
| --- | --- |
| `up` | `fin project status` shows a container that is Up |
| `down` | It answered, and nothing of the project is running |
| `?` | `fin` could not answer: it is not installed where the dashboard runs, or it failed |

### A new folder

The New folder form offers **Scaffold .docksal/ here (fin config generate)**: it runs `fin config generate` in the new folder, which writes `.docksal/docksal.env` with the default stack.

## Turn it on, and check it

```bash
cd ~/workspace
bash core/scripts/plugins.sh --require @webship.co/workspace-docksal
bash core/scripts/plugins.sh --activate docksal --with-needs     # adds the AI folders its items land in
bash core/scripts/plugins.sh --install docksal
bash core/scripts/plugins.sh --check docksal                     # fin: found, with its version, or missing
```

The plugin has no settings file. `fin` is installed outside the workspace: https://docs.docksal.io/getting-started/setup/

## Traps

- **Run the project init** runs `fin init`, the project's own init command: what it does is written in the project, and it may reinstall the site. Read `.docksal/commands/init` before running it.
- **Remove** is the only entry of the menu that is drawn in red: `fin project remove -f` removes the containers and their data, and the `-f` answers the question for you.
- **A verb answers "fin is not installed"**: the terminal session of the menu checks for `fin`
  first, and says where to get it.
- **A project on DDEV** keeps the workspace's own menus; this one is not drawn for it unless it
  also carries a `.docksal/` folder.

## The book

For any automated functional testing in this work (a Gherkin feature, a step definition, choosing a
step, a test run and its failures), read the book *Automated Functional Testing Recipes* first.

- **Where.** Use the first that exists: `.claude/automated-functional-testing-recipes/` in the project,
  `~/.claude/automated-functional-testing-recipes/` (installed by webship/webship-js-ai-agent,
  webship/webship-js-skills or webship/ai-agents), or
  https://github.com/webship/webship-js-ai-agent/tree/2.0.x/automated-functional-testing-recipes
- **How.** Its `README.md` first, then the chapter that matches the task (one file per chapter,
  named by its subject), not the single complete file.
- **Which wins.** The installed webship-js package and the step pack are the source of truth for
  step phrasing. When they differ from the book, follow them and say so.
