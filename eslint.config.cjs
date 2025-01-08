const baseConfig = require("./eslint.base.config.cjs");


module.exports = [
    ...baseConfig,

    ...baseConfig,
    {
        ignores: [
            "**/dist"
        ]
    },
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.jsx"
        ],
        rules: {
            "@nx/enforce-module-boundaries": [
                "error",
                {
                    enforceBuildableLibDependency: true,
                    allow: [
                        "^.*/eslint(\\.base)?\\.config\\.[cm]?js$"
                    ],
                    depConstraints: [
                        {
                            sourceTag: "*",
                            onlyDependOnLibsWithTags: [
                                "*"
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.jsx",
            "**/*.cjs",
            "**/*.mjs"
        ],
        // Override or add rules here
        rules: {}
    },
    {
        files: [
            "**/*.json"
        ],
        rules: {
            "@nx/dependency-checks": [
                "error",
                {
                    ignoredFiles: [
                        "{projectRoot}/eslint.config.{js,cjs,mjs}"
                    ]
                }
            ]
        },
        languageOptions: {
            parser: require("jsonc-eslint-parser")
        }
    },
    {
        files: [
            "**/*.json"
        ],
        rules: {
            "@nx/dependency-checks": [
                "error",
                {
                    ignoredFiles: [
                        "{projectRoot}/eslint.config.{js,cjs,mjs}"
                    ]
                }
            ]
        },
        languageOptions: {
            parser: require("jsonc-eslint-parser")
        }
    },
    {
        files: [
            "**/*.json"
        ],
        rules: {
            "@nx/dependency-checks": [
                "error",
                {
                    ignoredFiles: [
                        "{projectRoot}/eslint.config.{js,cjs,mjs}"
                    ]
                }
            ]
        },
        languageOptions: {
            parser: require("jsonc-eslint-parser")
        }
    },
    {
        files: [
            "**/*.json"
        ],
        rules: {
            "@nx/dependency-checks": [
                "error",
                {
                    ignoredFiles: [
                        "{projectRoot}/eslint.config.{js,cjs,mjs}"
                    ]
                }
            ]
        },
        languageOptions: {
            parser: require("jsonc-eslint-parser")
        }
    },
    {
        files: [
            "**/*.json"
        ],
        rules: {
            "@nx/dependency-checks": [
                "error",
                {
                    ignoredFiles: [
                        "{projectRoot}/eslint.config.{js,cjs,mjs}"
                    ]
                }
            ]
        },
        languageOptions: {
            parser: require("jsonc-eslint-parser")
        }
    },
    {
        files: [
            "**/*.json"
        ],
        rules: {
            "@nx/dependency-checks": [
                "error",
                {
                    ignoredFiles: [
                        "{projectRoot}/eslint.config.{js,cjs,mjs}"
                    ]
                }
            ]
        },
        languageOptions: {
            parser: require("jsonc-eslint-parser")
        }
    },
    {
        files: [
            "**/*.json"
        ],
        rules: {
            "@nx/dependency-checks": [
                "error",
                {
                    ignoredFiles: [
                        "{projectRoot}/eslint.config.{js,cjs,mjs}"
                    ]
                }
            ]
        },
        languageOptions: {
            parser: require("jsonc-eslint-parser")
        }
    },
    {
        files: [
            "**/*.json"
        ],
        rules: {
            "@nx/dependency-checks": [
                "error",
                {
                    ignoredFiles: [
                        "{projectRoot}/eslint.config.{js,cjs,mjs}"
                    ]
                }
            ]
        },
        languageOptions: {
            parser: require("jsonc-eslint-parser")
        }
    },
];
