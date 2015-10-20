describe("Custom ruleset", function(){
    var rules = customRules;
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = "/base/";
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

    it("does not contain unicode chars", function(){
        rulesStr = JSON.stringify(rules);
        rulesStrIsAscii = /^[\x00-\x7F]*$/.test(rulesStr);
        expect(rulesStrIsAscii).toBeTruthy();
    });
});
