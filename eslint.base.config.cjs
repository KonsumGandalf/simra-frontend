const nx = require("@nx/eslint-plugin");

const unusedImports = require('eslint-plugin-unused-imports');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const angularEslint = require('@angular-eslint/eslint-plugin');

module.exports = [
    ...nx.configs["flat/base"],
    ...nx.configs["flat/typescript"],
    ...nx.configs["flat/javascript"],
    {
        ignores: [
            "**/dist"
        ]
    },

    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
                    depConstraints: [
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*'],
                        },
                        {
                            sourceTag: 'type:master-feature',
                            onlyDependOnLibsWithTags: [
                                'type:feature',
                                'type:util-feature',
                                'type:util',
                                'type:common-model',
                            ],
                        },
                        {
                            sourceTag: 'type:feature',
                            onlyDependOnLibsWithTags: [
                                'type:feature',
                                'type:util-feature',
                                'type:util',
                                'type:common-model',
                                'type:ui',
                            ],
                        },
                        {
                            sourceTag: 'type:util-feature',
                            onlyDependOnLibsWithTags: [
                                'type:util',
                                'type:util-feature',
                                'type:common-model',
                            ],
                        },
                        {
                            sourceTag: 'type:util',
                            onlyDependOnLibsWithTags: ['type:util', 'type:common-model'],
                        },
                        {
                            sourceTag: 'type:common-model',
                            onlyDependOnLibsWithTags: ['type:common-model'],
                        },
                        {
                            sourceTag: 'type:ui',
                            onlyDependOnLibsWithTags: [
                                'type:ui',
                                'type:atoms-ui',
                                'type:molecules-ui',
                                'type:organisms-ui',
                                'type:common-model',
                                'type:util',
                            ],
                        },
                        {
                            sourceTag: 'type:atoms-ui',
                            onlyDependOnLibsWithTags: ['type:ui'],
                        },
                        {
                            sourceTag: 'type:molecules-ui',
                            onlyDependOnLibsWithTags: [
                                'type:ui',
                                'type:atoms-ui',
                                'type:molecules-ui',
                            ],
                        },
                        {
                            sourceTag: 'type:organisms-ui',
                            onlyDependOnLibsWithTags: [
                                'type:ui',
                                'type:atoms-ui',
                                'type:molecules-ui',
                                'type:organisms-ui',
                            ],
                        },
                        {
                            sourceTag: 'type:page-ui',
                            onlyDependOnLibsWithTags: [
                                'type:ui',
                                'type:atoms-ui',
                                'type:molecules-ui',
                                'type:organisms-ui',
                            ],
                        },
                        {
                            sourceTag: 'domain:common',
                            onlyDependOnLibsWithTags: ['domain:common'],
                        },
                        {
                            sourceTag: 'domain:rides',
                            onlyDependOnLibsWithTags: ['domain:common', 'domain:rides'],
                        },
                        {
                            sourceTag: 'domain:streets',
                            onlyDependOnLibsWithTags: ['domain:common', 'domain:streets'],
                        },
                        {
                            sourceTag: 'domain:incident',
                            onlyDependOnLibsWithTags: ['domain:common', 'domain:incident', 'domain:rides'],
                        }
                    ],
                },
            ],
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        plugins: {
            'unused-imports': unusedImports,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'error',
            "no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
        },
    },
    {
        files: ['**/*.page.ts'],
        plugins: {
            '@angular-eslint': angularEslint,
        },
        rules: {
            '@angular-eslint/component-class-suffix': [
                'error',
                {
                    suffixes: ['Page'],
                },
            ],
        },
    },
    {
        files: ['**/*.component.ts'],
        plugins:{
            '@angular-eslint': angularEslint,
        },
        rules: {
            '@angular-eslint/component-class-suffix': [
                'error',
                {
                    suffixes: ['Component'],
                },
            ],
        },
    },
    {
        files: ['*.ts', '*.tsx'],
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'simple-import-sort/imports': 'error',
        },
    },
];
