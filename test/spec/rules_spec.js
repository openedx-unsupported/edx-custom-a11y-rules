describe('Rules Spec', function () {
    function runRuleSpec (context) {
        describe(context.rule, function(){
            var rules = customRules,
                rule = context.rule,
                fixture = context.fixture,
                expectedResult = context.expectedResult.result,
                passCount = context.expectedResult.passCount,
                failCount = context.expectedResult.failCount,
                results;

            var sum = function(numsList){
                return numsList.reduce(function(memo, i){return memo + i;});
            };

            var verifyResults = function(){
                var failures = [0],
                    passes = [0];

                results.violations.forEach(function (r) {
                    if (r.id === rule) { failures.push(r.nodes.length); }
                });
                results.passes.forEach(function (r) {
                    if (r.id === rule){ passes.push(r.nodes.length); }
                });

                expect(sum(failures)).toEqual(failCount);
                expect(sum(passes)).toEqual(passCount);
            };

            beforeEach(function (done) {
                axe.configure(rules);
                jasmine.getFixtures().fixturesPath = '/base/';
                loadFixtures('test/fixtures/' + fixture);
                axe.a11yCheck(document, {}, function (r) { results = r; done(); });
            });

            it(fixture + ', should ' + expectedResult, function () {
                verifyResults();
            });
        });
    }

    var fail = function(fails){
            return {
                result: 'fail',
                failCount: fails || 1,
                passCount: 0
            };
        },
        pass = function(passes){
            return {
                result: 'pass',
                failCount: 0,
                passCount: passes || 1
            };
        },
        notRun =  function(){
            return {
                result: 'not run',
                failCount: 0,
                passCount: 0
            };
        };

    var specCases = [
            {
                rule: 'skip-link',
                fixture: 'skip-link-fail.html',
                expectedResult: fail()
            }, {
                rule: 'skip-link',
                fixture: 'skip-link-pass.html',
                expectedResult: pass()
            }, {
                rule: 'link-href',
                fixture: 'link-href-value-fail.html',
                expectedResult: fail(4)
            }, {
                rule: 'link-href',
                fixture: 'link-href-pass.html',
                expectedResult: pass()
            }, {
                rule: 'nav-aria-label',
                fixture: 'nav-aria-label-present-fail.html',
                expectedResult: fail()
            }, {
                rule: 'nav-aria-label',
                fixture: 'nav-aria-label-value-fail.html',
                expectedResult: fail(2)
            }, {
                rule: 'nav-aria-label',
                fixture: 'nav-aria-label-pass.html',
                expectedResult: pass()
            }, {
                rule: 'icon-aria-hidden',
                fixture: 'icon-aria-hidden-pass.html',
                expectedResult: pass(4)
            }, {
                rule: 'icon-aria-hidden',
                fixture: 'icon-aria-hidden-fail.html',
                expectedResult: fail(2)
            }, {
                rule: 'description',
                fixture: 'media.html',
                expectedResult: notRun(),
            }, {
                rule: 'caption',
                fixture: 'media.html',
                expectedResult: notRun(),
            }, {
                rule: 'section',
                fixture: 'section-heading-first-fail.html',
                expectedResult: fail(4)
            }, {
                rule: 'section',
                fixture: 'section-heading-first-pass.html',
                expectedResult: pass(7)
            }, {
                rule: 'icon-element',
                fixture: 'icon-correct-element-pass.html',
                expectedResult: pass(2)
            }, {
                rule: 'icon-element',
                fixture: 'icon-correct-element-fail.html',
                expectedResult: fail(2)
            }, {
                rule: 'valid-ids',
                fixture: 'valid-ids-pass.html',
                expectedResult: pass(1)
            }, {
                rule: 'valid-ids',
                fixture: 'valid-ids-fail.html',
                expectedResult: fail(10)
            },
        ];

    specCases.forEach(function(context){ runRuleSpec(context); });
});
