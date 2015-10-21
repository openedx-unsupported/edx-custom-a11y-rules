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
                failures = [for (r of results.violations) if (r.id === rule) r]
                expect(failures.length).toEqual(failCount);
                passes = [for (r of results.passes) if (r.id === rule) r]
                expect(passes.length).toEqual(passCount);
            }
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
    };

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
                rule: "skip-link",
                fixture: "skip-link-fail.html",
                expectedResult: fail
            }, {
                rule: "skip-link",
                fixture: "skip-link-pass.html",
                expectedResult: pass
            }, {
                rule: "link-href",
                fixture: "link-href-value-fail.html",
                expectedResult: fail
            }, {
                rule: "link-href",
                fixture: "link-href-value-fail-2.html",
                expectedResult: fail
            }, {
                rule: "link-href",
                fixture: "link-href-pass.html",
                expectedResult: pass
            }, {
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
        ]

    for (context of specCases) {
        runRuleSpec(context);
    }
});
