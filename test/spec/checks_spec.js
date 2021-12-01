describe('Checks Spec', function(){
    function runCheckSpec (context) {
        describe(context.checkId, function(){
            var rules = customRules,
                checkId = context.checkId,
                fixture = context.fixture,
                selector = context.selector,
                expectedResult = context.result,
                checkContext = {
                    _relatedNodes: [],
                    _data: null,
                    data: function (d) {
                        this._data = d;
                    },
                    relatedNodes: function (rn) {
                        this._relatedNodes = rn;
                    }
                },
                results,
                findCheck = function(){
                    var filtered = rules.checks.filter(function(value){
                        return value.id === checkId;
                    });
                    expect(filtered.length).toEqual(1);
                    return filtered[0];
                },
                evaluateCheck = function(){
                    var check = findCheck(checkId),
                        nodes = document.querySelectorAll(selector);
                    Array.prototype.forEach.call(nodes, function(node){
                        results = check.evaluate.call(checkContext, node);
                        expect(results).toEqual(expectedResult);
                    });
                };
            beforeEach(function () {
                jasmine.getFixtures().fixturesPath = '/base/';
                loadFixtures('test/fixtures/' + fixture);
            });
            it(selector + ' on ' + fixture + ', should return ' + expectedResult, function () {
                evaluateCheck();
            });
        });
    }

    var specCases = [
        {
            checkId: 'nav-aria-label-value',
            selector: 'nav',
            fixture: 'nav-aria-label-pass.html',
            result: true
        }, {
            checkId: 'nav-aria-label-value',
            selector: 'nav',
            fixture: 'nav-aria-label-value-fail.html',
            result: false
        }, {
            checkId: 'nav-aria-label-present',
            selector: 'nav',
            fixture: 'nav-aria-label-pass.html',
            result: true
        }, {
            checkId: 'nav-aria-label-present',
            selector: 'nav',
            fixture: 'nav-aria-label-present-fail.html',
            result: false
        }, {
            checkId: 'link-href',
            selector: 'a',
            fixture: 'link-href-pass.html',
            result: true
        }, {
            checkId: 'link-href',
            selector: 'a.missing-href',
            fixture: 'link-href-present-fail.html',
            result: false
        }, {
            checkId: 'link-href',
            selector: 'a#pound-sign',
            fixture: 'link-href-value-fail.html',
            result: false
        }, {
            checkId: 'link-href',
            selector: 'a#empty-href',
            fixture: 'link-href-value-fail.html',
            result: false
        }, {
            checkId: 'link-href-internal',
            selector: 'a',
            fixture: 'link-href-pass.html',
            result: true
        }, {
            checkId: 'link-href-internal',
            selector: 'a',
            fixture: 'link-href-present-fail.html',
            result: true
        }, {
            checkId: 'link-href-internal',
            selector: 'a#missing-target',
            fixture: 'link-href-value-fail.html',
            result: false
        }, {
            checkId: 'link-href-internal',
            selector: 'a#unfocusable-target',
            fixture: 'link-href-value-fail.html',
            result: false
        }, {
            checkId: 'icon-aria-hidden',
            selector: 'span.fa',
            fixture: 'icon-aria-hidden-pass.html',
            result: true
        }, {
            checkId: 'icon-aria-hidden',
            selector: 'span.icon',
            fixture: 'icon-aria-hidden-pass.html',
            result: true
        }, {
            checkId: 'icon-aria-hidden',
            selector: 'span.fa',
            fixture: 'icon-aria-hidden-fail.html',
            result: false
        }, {
            checkId: 'icon-aria-hidden',
            selector: 'i.icon',
            fixture: 'icon-aria-hidden-fail.html',
            result: false
        }, {
            checkId: 'icon-aria-hidden',
            selector: 'i.fa',
            fixture: 'icon-aria-hidden-fail.html',
            result: false
        }, {
            checkId: 'icon-aria-hidden',
            selector: 'span.icon',
            fixture: 'icon-aria-hidden-fail.html',
            result: false
        }, {
            checkId: 'section-heading-first-child',
            selector: 'section',
            fixture: 'section-heading-first-fail.html',
            result: false
        }, {
            checkId: 'section-heading-first-child',
            selector: 'section',
            fixture: 'section-heading-first-pass.html',
            result: true
        }, {
            checkId: 'icon-correct-element',
            selector: 'span.icon',
            fixture: 'icon-correct-element-pass.html',
            result: true
        }, {
            checkId: 'icon-correct-element',
            selector: 'span.fa',
            fixture: 'icon-correct-element-pass.html',
            result: true
        }, {
            checkId: 'icon-correct-element',
            selector: 'i.icon',
            fixture: 'icon-correct-element-fail.html',
            result: false
        }, {
            checkId: 'icon-correct-element',
            selector: 'i.fa',
            fixture: 'icon-correct-element-fail.html',
            result: false
        }
    ];


    specCases.forEach(function(context){ runCheckSpec(context); });
});
