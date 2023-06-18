module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['custom'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
  extends: 'next/core-web-vitals',
  plugins: ['simple-import-sort'],

  overrides: [
    {
      files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react$'],
              ['^next'],
              ['^@?\\w'],
              [
                ['^@ui', '^@components/(.*)$', '^@/(.*)$'],
                ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              ].flat(),
              ['^.+\\.s?css$'],
            ],
          },
        ],
      },
    },
  ],

  // overrides: [
  //   {
  //     files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
  //     rules: {
  //       'simple-import-sort/imports': [
  //         'error',
  //         {
  //           groups: [
  //             ['^react$'],
  //             ['^next'],
  //             ['^@?\\w'],
  //             [
  //               ['^@ui', '^@components/(.*)$', '^@/(.*)$'],
  //               ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
  //               ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
  //             ].flat(),
  //             ['^.+\\.s?css$'],
  //           ],
  //         },
  //       ],
  //     },
  //   },
  // ],
}
