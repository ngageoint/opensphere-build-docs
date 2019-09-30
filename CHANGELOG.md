# [2.0.0](https://github.com/ngageoint/opensphere-build-docs/compare/v1.2.1...v2.0.0) (2019-09-30)


### Features

* **dossier:** add direct dependency for js-dossier ([165d7cd](https://github.com/ngageoint/opensphere-build-docs/commit/165d7cd))


### BREAKING CHANGES

* **dossier:** This project now directly depends on js-dossier to resolve
version issues related to hoisted dependencies. Other projects should remove
their dependency on js-dossier and use the inherited version instead.

## [1.2.1](https://github.com/ngageoint/opensphere-build-docs/compare/v1.2.0...v1.2.1) (2019-07-09)


### Bug Fixes

* Update opensphere linter config to 3.0.0 ([2b155de](https://github.com/ngageoint/opensphere-build-docs/commit/2b155de))

<a name="1.2.0"></a>
# [1.2.0](https://github.com/ngageoint/opensphere-build-docs/compare/v1.1.0...v1.2.0) (2018-01-24)


### Features

* **warnings:** Suppress warning output unless --verbose flag provided. ([080ef88](https://github.com/ngageoint/opensphere-build-docs/commit/080ef88))

<a name="1.1.0"></a>
# [1.1.0](https://github.com/ngageoint/opensphere-build-docs/compare/v1.0.0...v1.1.0) (2018-01-05)


### Features

* **externs:** Resolve externs from node_modules. ([3b3050a](https://github.com/ngageoint/opensphere-build-docs/commit/3b3050a))
