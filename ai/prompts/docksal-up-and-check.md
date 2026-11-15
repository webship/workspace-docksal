Start a Docksal project of the workspace and say whether it came up, with the commands of the DOCKSAL menu.

```
claude --permission-mode bypassPermissions """
Start the Docksal project <project> and tell me whether it came up
# ~/workspace/<folder>/<project> · container-based (DDEV by default) · fin runs on the machine, in the project's folder
# only the commands below; nothing that removes containers or data; if a command fails, show why and stop

1. cd ~/workspace/<folder>/<project> ; ls .docksal/docksal.env .docksal/docksal.yml 2>/dev/null
   stop if none of those files is there: it is not a Docksal project
2. cd ~/workspace ; bash core/scripts/plugins.sh --check docksal ; cd ~/workspace/<folder>/<project>
   stop if fin is missing, and tell me where to get it
3. start it:
   fin project start
4. read its state:
   fin project status

Tell me what is running and what is not.
If it did not come up, show me the lines that say why. Do not try other flags, and remove nothing.
"""
```

The text between the triple quotes is plain: it can be given to another AI command-line assistant as it is.
