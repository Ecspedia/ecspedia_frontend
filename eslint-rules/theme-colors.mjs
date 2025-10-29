/**
 * ESLint Rule: theme-colors
 *
 * Enforces the use of theme colors defined in globals.css instead of
 * default Tailwind color palette (e.g., red-500, blue-600).
 *
 * @example
 * // ❌ Bad
 * <div className="bg-red-500 text-blue-600" />
 *
 * // ✅ Good
 * <div className="bg-primary text-secondary" />
 */

const ALLOWED_THEME_COLORS = [
  'background',
  'foreground',
  'primary',
  'secondary',
  'border',
  'error',
  'error-light',
  'error-dark',
  'success',
  'success-light',
  'success-dark',
  'success-bg',
  'warning',
  'warning-light',
  'warning-dark',
  'info',
  'info-light',
  'info-dark',
  'muted',
  'muted-foreground',
  'muted-dark',
  'muted-border',
  'accent',
  'accent-dark',
  'accent-gradient-start',
  'accent-gradient-end',
];

// black and white are allowed
const DEFAULT_TAILWIND_COLORS = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];

const ALLOWED_UTILITY_COLORS = ['transparent', 'current', 'inherit', 'white', 'black'];

/**
 * Extracts color classes from a className string
 * @param {string} classValue - The className attribute value
 * @returns {Array<{fullMatch: string, colorName: string, position: number}>}
 */
function extractColorClasses(classValue) {
  // Matches Tailwind color utilities with optional modifiers and opacity
  // Examples: bg-red-500, hover:text-blue-600, border-primary/50
  const colorPattern =
    /(?:^|\s)((?:hover:|focus:|active:|group-hover:|dark:)*)(bg|text|border|ring|fill|stroke|from|to|via|decoration|divide|outline|shadow|accent|caret)-([a-z]+)(?:-\d+)?(?:\/\d+)?/g;

  const matches = [];
  let match;

  while ((match = colorPattern.exec(classValue)) !== null) {
    matches.push({
      fullMatch: match[0].trim(),
      prefix: match[1],
      utility: match[2],
      colorName: match[3],
      position: match.index,
    });
  }

  return matches;
}

/**
 * Checks if a color is invalid (not in theme or allowed utilities)
 * @param {string} colorName - The color name to check
 * @returns {boolean}
 */
function isInvalidColor(colorName) {
  // Allow theme colors
  if (ALLOWED_THEME_COLORS.includes(colorName)) return false;

  // Allow utility colors (transparent, current, etc.)
  if (ALLOWED_UTILITY_COLORS.includes(colorName)) return false;

  // Check if it's a default Tailwind color
  return DEFAULT_TAILWIND_COLORS.includes(colorName);
}

/**
 * Validates color classes and reports errors
 * @param {Array} colorClasses - Array of color class objects
 * @param {Object} node - The AST node
 * @param {Array} allAllowedColors - All allowed color names
 * @param {Object} context - ESLint context
 */
function validateColorClasses(colorClasses, node, allAllowedColors, context) {
  for (const { fullMatch, colorName, utility } of colorClasses) {
    if (isInvalidColor(colorName)) {
      // Suggest a theme color based on the utility type
      let suggestion = 'primary';
      if (utility === 'bg') suggestion = 'primary or secondary';
      if (utility === 'text') suggestion = 'foreground or primary';
      if (utility === 'border') suggestion = 'border';

      context.report({
        node,
        messageId: 'invalidColor',
        data: {
          className: fullMatch,
          suggestion,
          allowed: allAllowedColors.join(', '),
        },
      });
    }
  }
}

/**
 * Recursively extracts and validates string literals from expressions
 * @param {Object} expr - The expression AST node
 * @param {Object} node - The original JSXAttribute node
 * @param {Array} allAllowedColors - All allowed color names
 * @param {Object} context - ESLint context
 */
function extractAndValidateFromExpression(expr, node, allAllowedColors, context) {
  if (!expr) return;

  // Handle string literals: 'bg-red-500'
  if (expr.type === 'Literal' && typeof expr.value === 'string') {
    const colorClasses = extractColorClasses(expr.value);
    validateColorClasses(colorClasses, node, allAllowedColors, context);
  }
  // Handle ConditionalExpression: condition ? 'bg-red-500' : 'bg-blue-500'
  else if (expr.type === 'ConditionalExpression') {
    extractAndValidateFromExpression(expr.consequent, node, allAllowedColors, context);
    extractAndValidateFromExpression(expr.alternate, node, allAllowedColors, context);
  }
  // Handle LogicalExpression: condition && 'bg-red-500'
  else if (expr.type === 'LogicalExpression') {
    extractAndValidateFromExpression(expr.left, node, allAllowedColors, context);
    extractAndValidateFromExpression(expr.right, node, allAllowedColors, context);
  }
  // Handle TemplateLiteral nested in expressions
  else if (expr.type === 'TemplateLiteral') {
    expr.quasis.forEach((quasi) => {
      if (quasi.value.raw) {
        const colorClasses = extractColorClasses(quasi.value.raw);
        validateColorClasses(colorClasses, node, allAllowedColors, context);
      }
    });
    expr.expressions.forEach((nestedExpr) => {
      extractAndValidateFromExpression(nestedExpr, node, allAllowedColors, context);
    });
  }
}

const themeColorsRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce using only theme colors defined in globals.css',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      invalidColor:
        'Use theme color "{{suggestion}}" instead of default Tailwind color "{{className}}". Available theme colors: {{allowed}}',
      unknownColor: 'Color "{{className}}" is not defined in theme. Available: {{allowed}}',
    },
    fixable: null, // Could be made fixable in the future
    schema: [
      {
        type: 'object',
        properties: {
          allowedColors: {
            type: 'array',
            items: { type: 'string' },
            description: 'Additional allowed color names beyond the theme',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    // Get options from ESLint config
    const options = context.options[0] || {};
    const additionalAllowedColors = options.allowedColors || [];
    const allAllowedColors = [...ALLOWED_THEME_COLORS, ...additionalAllowedColors];

    return {
      JSXAttribute(node) {
        // Only check className attributes
        if (node.name.name !== 'className') return;

        let classValue = '';

        // Handle string literals: className="bg-red-500"
        if (node.value?.type === 'Literal') {
          classValue = node.value.value || '';
        }
        // Handle dynamic expressions: className={`dynamic-${var}`} or className={condition ? 'a' : 'b'}
        else if (node.value?.type === 'JSXExpressionContainer') {
          const expression = node.value.expression;

          // Handle TemplateLiteral: className={`bg-${color}-500`}
          if (expression?.type === 'TemplateLiteral') {
            const template = expression;

            // Check static parts (quasis)
            template.quasis.forEach((quasi) => {
              if (quasi.value.raw) {
                const colorClasses = extractColorClasses(quasi.value.raw);
                validateColorClasses(colorClasses, node, allAllowedColors, context);
              }
            });

            // Check dynamic ${...} expressions for string literals
            template.expressions.forEach((expr) => {
              extractAndValidateFromExpression(expr, node, allAllowedColors, context);
            });
          }
          // Handle ConditionalExpression: className={condition ? 'bg-red-500' : 'bg-blue-500'}
          else if (expression?.type === 'ConditionalExpression') {
            extractAndValidateFromExpression(expression, node, allAllowedColors, context);
          }
          // Handle LogicalExpression: className={condition && 'bg-red-500'}
          else if (expression?.type === 'LogicalExpression') {
            extractAndValidateFromExpression(expression.left, node, allAllowedColors, context);
            extractAndValidateFromExpression(expression.right, node, allAllowedColors, context);
          }

          return;
        }

        if (!classValue) return;

        // Extract and validate color classes for string literals
        const colorClasses = extractColorClasses(classValue);
        validateColorClasses(colorClasses, node, allAllowedColors, context);
      },
    };
  },
};

export default themeColorsRule;
