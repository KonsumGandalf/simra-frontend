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
                                'type:master-feature',
                                'type:feature',
                                'type:util-feature',
                                'type:util',
                                'type:model',
                                'type:state',
                            ],
                        },
                        {
                            sourceTag: 'type:feature',
                            onlyDependOnLibsWithTags: [
                                'type:feature',
                                'type:util-feature',
                                'type:util',
                                'type:model',
                                'type:ui',
                                'type:state'
                            ],
                        },
                        {
                            sourceTag: 'type:util-feature',
                            onlyDependOnLibsWithTags: [
                                'type:util',
                                'type:util-feature',
                                'type:model',
                                'type:state'
                            ],
                        },
                        {
                            sourceTag: 'type:util',
                            onlyDependOnLibsWithTags: ['type:util', 'type:model'],
                        },
                        {
                            sourceTag: 'type:state',
                            onlyDependOnLibsWithTags: ['type:state', 'type:model', 'type:util'],
                        },
                        {
                            sourceTag: 'type:model',
                            onlyDependOnLibsWithTags: ['type:model'],
                        },
                        {
                            sourceTag: 'type:ui',
                            onlyDependOnLibsWithTags: [
                                'type:ui',
                                'type:model',
                                'type:util',
                                'type:state'
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
                            onlyDependOnLibsWithTags: ['domain:common', 'domain:incidents', 'domain:rides', 'domain:streets'],
                        },
                        {
                            sourceTag: 'domain:incidents',
                            onlyDependOnLibsWithTags: ['domain:common', 'domain:incidents'],
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
