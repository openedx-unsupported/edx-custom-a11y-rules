describe("Checks Spec", function(){
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
                results;

            var findCheck = function(){
                filtered = rules.checks.filter(function(value){
                    return value.id === checkId;
                });
                expect(filtered.length).toEqual(1);
                return filtered[0];
            };

            var evaluateCheck = function(){
                check = findCheck(checkId);
                nodes = document.querySelectorAll(selector);
                Array.prototype.forEach.call(nodes, function(node){
                    results = check.evaluate.call(checkContext, node);
                    expect(results).toEqual(expectedResult);
                });
            };
            beforeEach(function () {
                jasmine.getFixtures().fixturesPath = "/base/";
                loadFixtures("test/fixtures/" + fixture);
            });
            it(fixture + ", should return " + expectedResult, function () {
                evaluateCheck();
            });
        });
    };

    var specCases = [
        {
            checkId: "nav-aria-label-value",
            selector: "nav",
            fixture: "nav-aria-label-pass.html",
            result: true
        }, {
            checkId: "nav-aria-label-value",
            selector: "nav",
            fixture: "nav-aria-label-value-fail.html",
            result: false
        }, {
            checkId: "nav-aria-label-present",
            selector: "nav",
            fixture: "nav-aria-label-pass.html",
            result: true
        }, {
            checkId: "nav-aria-label-present",
            selector: "nav",
            fixture: "nav-aria-label-present-fail.html",
            result: false
        }, {
            checkId: "link-href",
            selector: "a",
            fixture: "link-href-pass.html",
            result: true
        }, {
            checkId: "link-href",
            selector: "a",
            fixture: "link-href-present-fail.html",
            result: false
        }, {
            checkId: "link-href",
            selector: "a",
            fixture: "link-href-value-fail.html",
            result: false
        }, {
            checkId: "link-href",
            selector: "a",
            fixture: "link-href-value-fail-2.html",
            result: false
        }
    ]

    for (context of specCases) {
        runCheckSpec(context);
    }
});
