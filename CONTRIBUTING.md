# Contributing to addon-ui

## Workflow

- Create feature branches from `develop` and open pull requests back into `develop`.
- Merge the intended release changes from `develop` into `main`.
- A push to `main` runs the release workflow, which creates the version commit, tag, GitHub Release, npm publication, and
  sync back to `develop`.

## Commit messages

Use Conventional Commits:

```text
<type>(<optional scope>): <subject>
```

Mark a breaking change with `!` after the type/scope, or with a `BREAKING CHANGE:` or `BREAKING-CHANGE:` footer.

```text
refactor!: remove deprecated API

BREAKING CHANGE: Consumers must use the replacement API.
```

## Version policy

Release-it derives the next version from commit history. The highest applicable bump wins.

- Before `1.0.0`, a breaking change produces a minor release (`0.y.0`).
- Starting at `1.0.0`, a breaking change produces a major release (`x.0.0`).
- `feat` produces a minor release.
- `fix`, `perf`, `refactor`, and `ci` produce a patch release.
- `docs`, `test`, `chore`, and `build` do not produce a release on their own.

## Documentation and validation

- Keep canonical user documentation in `docs/` in sync with public props and CSS variables.
- Update Storybook stories when a visual component change needs review.
- Before opening a pull request, run the relevant checks: `npm run lint`, `npm run typecheck`, `npm test`, and
  `npm run build:types`.
