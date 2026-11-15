---
description: Say whether a Webship Workspace project is a Docksal project and whether it is up, with the read-only commands the DOCKSAL menu runs. Nothing is started, stopped or removed.
argument-hint: '<project>'
---

# /docksal-status

Say where this project stands on Docksal: `$ARGUMENTS`

The argument is one word: the project, which is its folder name in a workspace folder. With no
project, stop and ask for one.

The workspace is container-based (DDEV by default); `fin` runs on the machine, in the project's
folder. This command only reads: these are the entries of the DOCKSAL menu of the Docksal plugin
(`@webship.co/workspace-docksal`) that change nothing. Never start, stop, restart, build or remove anything here.

## 1. Find the project and its file

```bash
ls -d ~/workspace/*/<project>
cd ~/workspace/<folder>/<project>
ls .docksal/docksal.env .docksal/docksal.yml 2>/dev/null
```

If none of those files is there, stop and say that it is not a Docksal project: the DOCKSAL menu is
not on it either.

## 2. Is `fin` here

```bash
cd ~/workspace && bash core/scripts/plugins.sh --check docksal
```

If it is missing, say so with the address it gives (https://docs.docksal.io/getting-started/setup/), and stop.

## 3. Read

```bash
cd ~/workspace/<folder>/<project>
fin project status
```

## 4. Report

The file the project was recognised by, then what is running and what is not, in the words of
the answer. 

For starting or stopping it, hand over to the agent `docksal-operator`.
