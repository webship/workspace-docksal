Feature: The Docksal plugin on a project row
  Once the plugin is activated and installed, every project folder that carries a .docksal/ folder carries
  the DOCKSAL menu, and the Plugins page lists the plugin with its four steps.

  # The Plugins page names each plugin; the package is on the plugin's own page (the row shows it on hover only).
  Scenario: The plugin is listed on the Plugins page, and its own page names its package
    Given I am on "/settings/plugins"
     Then I should see "Docksal"
     When I go to "/settings/plugin/docksal"
     Then I should see "@webship.co/workspace-docksal"

  # The AI folders are searched by name: with every plugin on, a folder lists more than one page of items.
  Scenario: The AI Agents folder lists the agent the plugin ships
    Given I am on "/ai-agents?q=docksal-operator"
     Then I should see "docksal-operator"

  Scenario: The AI Skills folder lists the skill the plugin ships
    Given I am on "/ai-skills?q=docksal-menu"
     Then I should see "docksal-menu"

  Scenario: The AI Commands folder lists the command the plugin ships
    Given I am on "/ai-commands?q=docksal-status"
     Then I should see "docksal-status"

  Scenario: The AI Prompts folder lists the prompt the plugin ships
    Given I am on "/ai-prompts?q=docksal-up-and-check"
     Then I should see "docksal-up-and-check"
