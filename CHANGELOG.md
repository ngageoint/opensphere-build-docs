## [2.0.2](https://github.com/ngageoint/opensphere-build-docs/compare/v2.0.1...v2.0.2) (2020-06-09)


### Bug Fixes

* **update:** use latest, 3.5.1 version of query ([fa94013](https://github.com/ngageoint/opensphere-build-docs/commit/fa9401374c97999c78ebb21731aa3999e8001fa1))

## [2.0.1](https://github.com/ngageoint/opensphere-build-docs/compare/v2.0.0...v2.0.1) (2020-02-05)


### Bug Fixes

* **gcc:** update closure deps ([6a62557](https://github.com/ngageoint/opensphere-build-docs/commit/6a6255746523c9a94a608a4dcb5e74ce94c8945e))

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
