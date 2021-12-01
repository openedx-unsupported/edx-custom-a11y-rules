describe('Integration Spec', function(){
    var rules = customRules;

    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = '/base/';
    });

    it('rules can be configured with axe-core', function(){
        axe.configure(rules);
        var configuredRules = axe.getRules(['edx-custom']),
            configuredRuleIds = configuredRules.map(function(rule) { return rule.ruleId; }).sort(),
            expectedRuleIds = rules.rules.map(function(rule) { return rule.id; }).sort();
        expect(configuredRuleIds).toEqual(expectedRuleIds);
    });

    it('checks can be configured with axe-core', function(){
        axe.configure(rules);
        var configuredChecks = axe._audit.checks,
            configuredCheckIds = Object.keys(configuredChecks);
        for (check of rules.checks) { // jshint ignore:line
            expect(configuredCheckIds.indexOf(check.id)).toBeGreaterThan(-1);
        }
    });

    it('does not contain unicode chars', function(){
        var rulesStr = JSON.stringify(rules),
            rulesStrIsAscii = /^[\x00-\x7F]*$/.test(rulesStr);
        expect(rulesStrIsAscii).toBeTruthy();
    });
});
