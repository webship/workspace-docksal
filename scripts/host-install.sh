#!/usr/bin/env bash
## The host side of the Docksal plugin: the CLI on this machine. Run by core/scripts/plugins.sh
## --install docksal, and by core/scripts/install.sh for every installed plugin that ships one.
## Idempotent: whatever is already there is reported, not redone; nothing is installed unasked.
set -u
BIN='';
for candidate in "$(command -v fin 2>/dev/null)" "${HOME}/.local/bin/fin" ; do
  [ -n "${candidate}" ] && [ -x "${candidate}" ] && { BIN="${candidate}"; break; }
done
if [ -n "${BIN}" ] ; then
  printf '  ✓ %-16s %s\n' "fin" "${BIN}" ;
else
  printf '  ✗ %-16s %s\n' "fin" "missing — the DOCKSAL menu's verbs need it (docs.docksal.io/getting-started/setup)" ;
fi
