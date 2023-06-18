module.exports = {
  root: true,
  extends: ['custom'],
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
}
