/**
 * Custom ESLint Rules
 *
 * This module exports all custom ESLint rules for the project.
 * Add new custom rules here as the project grows.
 */

import themeColors from './theme-colors.mjs';

const customRules = {
  rules: {
    'theme-colors': themeColors,
  },
};

export default customRules;
