# @webship/workspace-docksal

Docksal for the [Webship Workspace](https://github.com/webship/workspace) dashboard: the **DOCKSAL**
menu on every project folder that carries a .docksal/ folder, with the runtime's verbs as terminal sessions in
the project, the up/down caption and the site link, and "Scaffold .docksal/ here (fin config generate)" when a new folder is made.
A runtime of [`@webship/workspace-container`](https://github.com/webship/workspace-container).

A project is a Docksal project when it carries `.docksal/` (`docksal.env` or `docksal.yml`); the site link is `VIRTUAL_HOST` from `docksal.env`, or `<folder>.docksal.site`.

## Use it

```bash
cd ~/workspace
bash core/scripts/plugins.sh --require github:webship/workspace-docksal
bash core/scripts/plugins.sh --activate docksal
bash core/scripts/plugins.sh --install docksal
```

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
