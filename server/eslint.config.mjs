import pluginJs from '@eslint/js';

import globals from 'globals';

export default [
  {
    languageOptions: {
      globals: globals.node, // Solo ambiente Node.js
    },
  },
  pluginJs.configs.recommended,
];

/**
 *
 * import pluginJs from '@eslint/js';
 * import globals from 'globals';
 *
 * export default [
 *   {
 *     languageOptions: {
 *       globals: globals.node,  // Solo ambiente Node.js
 *     },
 *   },
 *   pluginJs.configs.recommended,
 * ];
 *
 */
