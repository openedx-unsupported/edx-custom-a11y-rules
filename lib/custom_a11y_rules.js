var customRules = {
  "rules": [
    {
      "id": "nav-aria-label",
      "selector": "nav",
      "enabled": true,
      "tags": [ "edx-custom" ],
      "all": [
        "nav-aria-label-present",
        "nav-aria-label-value"
      ],
      "any": [],
      "none": [],
      "metadata": {
        "description": "Ensures <nav> elements have valid aria-label attribute.",
        "help": "<nav> elements MUST have an aria-label, and the aria-label MUST NOT have 'navigation' or 'nav' as part of the value.",
        "helpUrl": "https://openedx.atlassian.net/wiki/display/A11Y/edX+Specific+Accessibility+Tests"
      }
    },
    {
      "id": "link-href",
      "selector": "a",
      "enabled": true,
      "tags": [ "edx-custom" ],
      "all": [
        "link-href"
      ],
      "any": [],
      "none": [],
      "metadata": {
        "description": "Ensures <a> elements have acceptable href values",
        "help": "all links must have an href whose value MUST NOT be empty or \"#\"",
        "helpUrl": "https://openedx.atlassian.net/wiki/display/A11Y/edX+Specific+Accessibility+Tests"
      }
    }
  ],
  "checks": [
    {
      "id": "nav-aria-label-present",
      "metadata": {
        "impact": "critical",
        "messages": {
          "pass": "all <nav> elements MUST have an aria-label or aria-labelledby attribute",
          "fail": "all <nav> elements MUST have aria-label or aria-labelledby attribute"
        }
      },
      evaluate: function(node, options) {
        return axe.commons.aria.label(node) !== null;
      },
    },
    {
      "id": "nav-aria-label-value",
      "metadata": {
        "impact": "critical",
        "messages": {
          "pass": "aria-label values on <nav> elements MUST NOT have \"navigation\" or \"nav\" as part of their value",
          "fail": "aria-label values on <nav> elements MUST NOT have \"navigation\" or \"nav\" as part of their value"
        }
      },
      evaluate: function(node, options) {
        words = axe.commons.aria.label(node).toLowerCase().split(" ");
        return words.indexOf('nav') < 0 && words.indexOf('navigation') < 0;
      },
    },
    {
      "id": "link-href",
      "metadata": {
        "impact": "critical",
        "messages": {
          "pass": "href value MUST NOT be empty or \"#\"",
          "fail": "href value MUST NOT be empty or \"#\""
        }
      },
      evaluate: function(node, options) {
        href = node.getAttribute("href");
        return (href === null || href === "" || href === "#") ? false : true;
      },
    }
  ]
};
