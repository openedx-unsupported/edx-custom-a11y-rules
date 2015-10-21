var ruleSpec = function (context){
    describe("should", function(){
        var rules = customRules,
            rule = context.rule,
            fixture = context.fixture,
            expectedResult = context.expectedResult.results,
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
            loadFixtures(fixture);
            axe.a11yCheck(document, {}, function (r) { results = r; done(); });
        });
        it(expectedResult, function () {
            verifyResults();
        });
    });
};
var fail = {
    result: "fail",
    failCount: 1,
    passCount: 0
};
var pass = {
    result: "pass",
    failCount: 0,
    passCount: 1
};
describe("skip-link", function () {
    var context = { rule: "skip-link" };
    describe("(skip-link-fail.html)", function(){
        context.fixture = "test/fixtures/skip-link-fail.html";
        context.expectedResult = fail;
        ruleSpec(context);
    })
    describe("(skip-link-pass.html)", function(){
        context.fixture = "test/fixtures/skip-link-pass.html";
        context.expectedResult = pass;
        ruleSpec(context);
    })
});
describe("link-href", function () {
    var context = { rule: "link-href" };
    describe("(link-href-value-fail.html)", function(){
        context.fixture = "test/fixtures/link-href-value-fail.html";
        context.expectedResult = fail;
        ruleSpec(context);
    })
    describe("(link-href-value-fail-2.html)", function(){
        context.fixture = "test/fixtures/link-href-value-fail-2.html";
        context.expectedResult = fail;
        ruleSpec(context);
    })
    describe("(link-href-pass.html)", function(){
        context.fixture = "test/fixtures/link-href-pass.html";
        context.expectedResult = pass;
        ruleSpec(context);
    })
});

describe("nav-aria-label", function () {
    var context = { rule: "nav-aria-label" };
    describe("(nav-aria-label-value-fail.html)", function(){
        context.fixture = "test/fixtures/nav-aria-label-value-fail.html";
        context.expectedResult = fail;
        ruleSpec(context);
    })
    describe("(nav-aria-label-present-fail.html)", function(){
        context.fixture = "test/fixtures/nav-aria-label-present-fail.html";
        context.expectedResult = fail;
        ruleSpec(context);
    })
    describe("(nav-aria-label-pass.html)", function(){
        context.fixture = "test/fixtures/nav-aria-label-pass.html";
        context.expectedResult = pass;
        ruleSpec(context);
    })
});
