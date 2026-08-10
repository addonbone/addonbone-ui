const {whatBump} = require("../.release-it.cjs");

describe("release-it version policy", () => {
    describe("breaking changes", () => {
        test.each([
            ["parser breaking field", {type: "feat", breaking: "!"}],
            ["type suffix", {type: "feat!"}],
            ["header suffix", {type: "feat", header: "feat(ui)!: remove legacy API"}],
            ["BREAKING CHANGE note", {type: "fix", notes: [{title: "BREAKING CHANGE", text: "new contract"}]}],
            ["BREAKING-CHANGE footer", {type: "fix", footer: "BREAKING-CHANGE: new contract"}],
        ])("treats %s as a pre-1.0 minor bump", (_label, commit) => {
            expect(whatBump([commit], "0.11.0")).toEqual({level: 1});
        });

        test("becomes a major bump after 1.0", () => {
            expect(
                whatBump([{type: "fix", notes: [{title: "BREAKING CHANGE", text: "new contract"}]}], "1.4.2")
            ).toEqual({level: 0});
        });

        test("takes precedence over lower-level changes after 1.0", () => {
            expect(whatBump([{type: "fix"}, {type: "feat"}, {type: "refactor", breaking: true}], "2.0.0")).toEqual({
                level: 0,
            });
        });
    });

    test("uses a minor bump for feat", () => {
        const type = "feat";

        expect(whatBump([{type}], "0.11.0")).toEqual({level: 1});
    });

    test.each(["fix", "perf", "refactor", "ci"])("uses a patch bump for %s", type => {
        expect(whatBump([{type}], "0.11.0")).toEqual({level: 2});
    });

    test("uses the highest non-breaking bump", () => {
        expect(whatBump([{type: "fix"}, {type: "feat"}], "0.11.0")).toEqual({level: 1});
    });

    test.each(["docs", "test", "chore", "build"])("does not release for %s alone", type => {
        expect(whatBump([{type}], "0.11.0")).toBeNull();
    });
});
