describe("Custom ruleset", function(){
    rules = null;
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = "/base/";
        rulesStr = readFixtures("lib/custom_a11y_rules.js");
        rules = eval(rulesStr); // jshint ignore:line
    });
    it("rules can be configured with axe-core", function(){
        axe._load({});
        axe.configure(rules);
        configuredRules = axe.getRules(['edx-custom']);
        configuredRuleIds = [for (rule of configuredRules) rule.ruleId]; // jshint ignore:line
        expectedRuleIds = [for (rule of rules.rules) rule.id]; // jshint ignore:line
        expect(configuredRuleIds).toEqual(expectedRuleIds);
    });
    it("checks can be configured with axe-core", function(){
        axe._load({});
        axe.configure(rules);
        configuredChecks = axe._audit.checks;
        configuredCheckIds = Object.keys(configuredChecks);
        expectedCheckIds = [for (check of rules.checks) check.id]; // jshint ignore:line
        expect(configuredCheckIds).toEqual(expectedCheckIds);
    });
});
