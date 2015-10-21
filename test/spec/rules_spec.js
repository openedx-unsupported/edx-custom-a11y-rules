describe("Rules Spec", function () {
    function runRuleSpec (context) {
        describe(context.rule, function(){
            var rules = customRules,
                rule = context.rule,
                fixture = context.fixture,
                expectedResult = context.expectedResult.result,
                passCount = context.expectedResult.passCount,
                failCount = context.expectedResult.failCount,
                results;

            var verifyResults = function(){
                var failures = [],
                    passes = [];

                results.violations.forEach(function (r) {
                    if (r.id === rule) { failures.push(r); }
                });
                results.passes.forEach(function (r) {
                    if (r.id === rule){ passes.push(r); }
                });

                expect(failures.length).toEqual(failCount);
                expect(passes.length).toEqual(passCount);
            };

            beforeEach(function (done) {
                axe.configure(rules);
                jasmine.getFixtures().fixturesPath = "/base/";
                loadFixtures("test/fixtures/" + fixture);
                axe.a11yCheck(document, {}, function (r) { results = r; done(); });
            });

            it(fixture + ", should " + expectedResult, function () {
                verifyResults();
            });
        });
    }

    var fail = {
            result: "fail",
            failCount: 1,
            passCount: 0
        },
        pass = {
            result: "pass",
            failCount: 0,
            passCount: 1
        },
        specCases = [
            {
                rule: "nav-aria-label",
                fixture: "nav-aria-label-present-fail.html",
                expectedResult: fail
            }, {
                rule: "nav-aria-label",
                fixture: "nav-aria-label-value-fail.html",
                expectedResult: fail
            }, {
                rule: "nav-aria-label",
                fixture: "nav-aria-label-pass.html",
                expectedResult: pass
            }
        ];

    specCases.forEach(function(context){ runRuleSpec(context); });
});
