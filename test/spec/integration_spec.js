describe("Integration Spec", function(){
    var rules = customRules;
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = "/base/";
    });
    it("rules can be configured with axe-core", function(){
        axe.configure(rules);
        configuredRules = axe.getRules(['edx-custom']);
        configuredRuleIds = [for (rule of configuredRules) rule.ruleId].sort(); // jshint ignore:line
        expectedRuleIds = [for (rule of rules.rules) rule.id].sort(); // jshint ignore:line
        expect(configuredRuleIds).toEqual(expectedRuleIds);
    });
    it("checks can be configured with axe-core", function(){
        axe.configure(rules);
        configuredChecks = axe._audit.checks;
        configuredCheckIds = Object.keys(configuredChecks);
        for (check of rules.checks) { // jshint ignore:line
            expect(configuredCheckIds.indexOf(check.id)).toBeGreaterThan(-1);
        }
    });

    it("does not contain unicode chars", function(){
        rulesStr = JSON.stringify(rules);
        rulesStrIsAscii = /^[\x00-\x7F]*$/.test(rulesStr);
        expect(rulesStrIsAscii).toBeTruthy();
    });
});
