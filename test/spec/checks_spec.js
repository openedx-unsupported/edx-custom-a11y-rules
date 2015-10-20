describe("Custom ruleset", function(){
    var rules = customRules;
    var checkContext = {
        _relatedNodes: [],
        _data: null,
        data: function (d) {
            this._data = d;
        },
        relatedNodes: function (rn) {
            this._relatedNodes = rn;
        }
    };

    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = "/base/";
    });

    var findCheck = function(checkId){
        filtered = rules.checks.filter(function(value){
            return value.id === checkId;
        });
        expect(filtered.length).toEqual(1);
        return filtered[0];
    };

    var evaluateCheck = function(checkId, selector, expectedResult){
        check = findCheck(checkId);
        nodes = document.querySelectorAll(selector);
        Array.prototype.forEach.call(nodes, function(node){
            results = check.evaluate.call(checkContext, node);
            expect(results).toEqual(expectedResult);
        });
    };

    describe("nav-aria-label", function(){
        describe("nav-aria-label-value", function(){
            var checkId = "nav-aria-label-value",
                selector = "nav";
            it("should pass", function(){
                loadFixtures("test/fixtures/nav-aria-label-pass.html");
                evaluateCheck(checkId, selector, true);
            });
            it("should fail", function(){
                loadFixtures("test/fixtures/nav-aria-label-value-fail.html");
                evaluateCheck(checkId, selector, false);
            });
        });

        describe("nav-aria-label-present", function(){
            var checkId = "nav-aria-label-present",
                selector = "nav";

            it("should pass", function(){
                loadFixtures("test/fixtures/nav-aria-label-pass.html");
                evaluateCheck(checkId, selector, true);
            });
            it("should fail", function(){
                loadFixtures("test/fixtures/nav-aria-label-present-fail.html");
                evaluateCheck(checkId, selector, false);
            });
        });
    });
    describe("link-href", function(){
        var checkId = "link-href",
            selector = "a";
        it("should pass", function(){
            loadFixtures("test/fixtures/link-href-pass.html");
            evaluateCheck(checkId, selector, true);
        });
        it("should fail because the href value is '#'", function(){
            loadFixtures("test/fixtures/link-href-value-fail.html");
            evaluateCheck(checkId, selector, false);
        });
        it("should fail because the href value is ''", function(){
            loadFixtures("test/fixtures/link-href-value-fail-2.html");
            evaluateCheck(checkId, selector, false);
        });
        it("should fail because there is no href", function(){
            loadFixtures("test/fixtures/link-href-present-fail.html");
            evaluateCheck(checkId, selector, false);
        });
    });
});
