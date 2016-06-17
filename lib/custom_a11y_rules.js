var customRules = {
    'rules': [
        {
            'id': 'description',
            'enabled': false,
            'tags': [ 'edx-custom' ],
        },
        {
            'id': 'caption',
            'enabled': false,
            'tags': [ 'edx-custom' ],
        },
        {
            'id': 'nav-aria-label',
            'selector': 'nav',
            'enabled': true,
            'tags': [ 'edx-custom' ],
            'all': [
                'nav-aria-label-present',
                'nav-aria-label-value'
            ],
            'any': [],
            'none': [],
            'metadata': {
                'description': 'Ensures <nav> elements have valid aria-label attribute.',
                'help': '<nav> elements MUST have an aria-label, and the aria-label MUST NOT have ' +
                        '\'navigation\' or \'nav\' as part of the value.',
                'helpUrl': 'https://openedx.atlassian.net/wiki/display/A11Y/edX+Specific+Accessibility+Tests'
            }
        },
        {
            'id': 'link-href',
            'selector': 'a',
            'enabled': true,
            'tags': [ 'edx-custom' ],
            'all': [
                'link-href',
                'link-href-internal'
            ],
            'any': [],
            'none': [],
            'metadata': {
                'description': 'Ensures <a> elements have acceptable href values',
                'help': 'all links must have an href whose value MUST NOT be empty or "#"',
                'helpUrl': 'https://openedx.atlassian.net/wiki/display/A11Y/edX+Specific+Accessibility+Tests'
            }
        },
        {
            'id': 'skip-link',
            'selector': 'a[href]',
            'pageLevel': true,
            'enabled': true,
            'tags': ['edx-custom'],
            'all': [],
            'any': ['skip-link'],
            'none': [],
            'metadata': {
                'description': 'Ensures the first link on the page is a skip link',
                'help': 'The page should have a skip link as its first link',
                'helpUrl': 'https://dequeuniversity.com/rules/axe/1.1/skip-link'
            }
        },
        {
            'id': 'icon-aria-hidden',
            'selector': 'span.icon, span.fa, i.icon, i.fa',
            'enabled': true,
            'excludeHidden': false,
            'tags': ['edx-custom'],
            'all': ['icon-aria-hidden'],
            'any': [],
            'none': [],
            'metadata': {
                'description': 'Ensures all icon-font elements are aria-hidden',
                'help': 'All icon-fonts should have aria-hidden="true"',
                'helpUrl': 'https://openedx.atlassian.net/wiki/display/A11Y/edX+Specific+Accessibility+Tests'
            }
        },
        {
            'id': 'section',
            'selector': 'section',
            'enabled': true,
            'excludeHidden': false,
            'tags': ['edx-custom'],
            'all': ['section-heading-first-child'],
            'any': [],
            'none': [],
            'metadata': {
                'description': 'Ensures all sections have a heading as the first child',
                'help': 'All <section> elements should have a heading as its first child',
                'helpUrl': 'https://openedx.atlassian.net/wiki/display/A11Y/edX+Specific+Accessibility+Tests'
            }
        },
        {
            'id': 'icon-element',
            'selector': 'span.icon, span.fa, i.icon, i.fa',
            'enabled': true,
            'excludeHidden': false,
            'tags': ['edx-custom'],
            'all': ['icon-correct-element'],
            'any': [],
            'none': [],
            'metadata': {
                'description': 'Ensures all icon-font use span instead of i',
                'help': 'All icon-fonts should use a span element, not an i',
                'helpUrl': 'https://openedx.atlassian.net/wiki/display/A11Y/edX+Specific+Accessibility+Tests'
            }
        },
    ],
    'checks': [
        {
            'id': 'nav-aria-label-present',
            'metadata': {
                'impact': 'critical',
                'messages': {
                    'pass': 'all <nav> elements MUST have an aria-label or aria-labelledby attribute',
                    'fail': 'all <nav> elements MUST have aria-label or aria-labelledby attribute'
                }
            },
            evaluate: function(node, options) {
                return axe.commons.aria.label(node) !== null;
            },
        },
        {
            'id': 'nav-aria-label-value',
            'metadata': {
                'impact': 'critical',
                'messages': {
                    'pass': 'aria-label values on <nav> elements MUST NOT have' +
                            ' "navigation" or "nav" as part of their value',
                    'fail': 'aria-label values on <nav> elements MUST NOT have' +
                            ' "navigation" or "nav" as part of their value'
                }
            },
            evaluate: function(node, options) {
                var label = axe.commons.aria.label(node) || '',
                    words = label.toLowerCase().split(' ');
                return words.indexOf('nav') < 0 && words.indexOf('navigation') < 0;
            },
        },
        {
            'id': 'link-href',
            'metadata': {
                'impact': 'critical',
                'messages': {
                    'pass': 'href value MUST NOT be empty or "#"',
                    'fail': 'href value MUST NOT be empty or "#"'
                }
            },
            evaluate: function(node, options) {
                var href = node.getAttribute('href');
                if (href === null || href === '' || href === '#') {
                    return false;
                } else {
                    return true;
                }
            },
        },
        {
            'id': 'link-href-internal',
            'metadata': {
                'impact': 'critical',
                'messages': {
                    'pass': 'internal link must have focusable target',
                    'fail': 'internal link must have focusable target'
                }
            },
            evaluate: function(node, options) {
                var href = node.getAttribute('href') || '';
                if (href.startsWith('#') && href.length > 1) {
                    linkTarget = document.querySelector(href);
                    return axe.commons.dom.isFocusable(linkTarget);
                } else {
                    return true;
                }
            },
        },
        {
            'id': 'icon-aria-hidden',
            'metadata': {
                'impact': 'critical',
                'messages': {
                    'pass': 'icon elements should be aria-hidden',
                    'fail': 'icon elements should be aria-hidden'
                }
            },
            evaluate: function(node, options) {
                return axe.utils.isHidden(node);
            },
        },
        {
            'id': 'section-heading-first-child',
            'metadata': {
                'impact': 'minor',
                'messages': {
                    'pass': '<section> elements should have a heading as its first child',
                    'fail': '<section> elements should have a heading as its first child'
                }
            },
            evaluate: function(node, options) {
                var childNode = node.children[0].nodeName,
                    validHeadings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
                
                if (validHeadings.indexOf(childNode) > -1) {
                    return true;
                } else {
                    return false;
                }
            },
        },
        {
            'id': 'icon-correct-element',
            'metadata': {
                'impact': 'minor',
                'messages': {
                    'pass': 'icon-fonts should use the span element, not i',
                    'fail': 'icon-fonts should use the span element, not i'
                },
            },
            evaluate: function(node, options) {
                var elem = node.nodeName,
                    validElems = ['SPAN'];
                    
                if (validElems.indexOf(elem) > -1) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]
};
