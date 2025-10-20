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

const ALLOWED_THEME_COLORS = ['background', 'foreground', 'primary', 'secondary', 'border'];

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
        // Skip dynamic expressions: className={cn(...)} or className={`dynamic-${var}`}
        // Hard to analize
        else if (node.value?.type === 'JSXExpressionContainer') {
          return;
        }

        if (!classValue) return;

        // Extract and validate color classes
        const colorClasses = extractColorClasses(classValue);

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
      },
    };
  },
};

export default themeColorsRule;
