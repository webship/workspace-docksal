Feature: The Docksal plugin on a project row
  Once the plugin is activated and installed, every project folder that carries a .docksal/ folder carries
  the DOCKSAL menu, and the Plugins page lists the plugin with its four steps.

  Scenario: The plugin is listed on the Plugins page
    Given I am on "/settings/plugins"
     Then I should see "Docksal"
      And I should see "@webship.co/workspace-docksal"
