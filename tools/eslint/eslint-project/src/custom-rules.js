/** @type {import('eslint').Rule.RuleModule} */
const avoidName = {
  meta: {
    type: "problem",
    docs: {
      description: "avoid using these names",
    },
    messages: {
      avoidName: "Avoid using variable named '{{ name }}'",
    },
  },
  create(context) {
    return {
      Identifier(node) {
        if (["foo", "bar", "hello"].includes(node.name)) {
          context.report({
            node,
            messageId: "avoidName",
            data: {
              name: node.name,
            },
          });
        }
      },
    };
  },
};

/** @type {import('eslint').Rule.RuleModule} */
const avoidUsingEval = {
  meta: {
    type: "suggestion",
    fixable: "code",
    messages: {
      avoidUsingEval: "Avoid using eval",
    },
    docs: {
      description: "Enforcing to does not use eval",
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.name === "eval") {
          context.report({
            node,
            messageId: "avoidUsingEval",
            fix: function (fixer) {
              return fixer.replaceText(node, "/* eval removed */");
            },
          });
        }
      },
    };
  },
};

/** @type {import('eslint').Rule.RuleModule} */
const avoidMoreThaThreeArgs = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Avoid to use more than 3 arguments in the function",
    },
    hasSuggestions: true,
  },
  create(context) {
    function checkParams(node) {
      if (node.params.length > 3) {
        context.report({
          node,
          message: "Avoid using more than 3 arguments in a function",
          // Show suggestions in quick fixes
          suggest: [
            {
              desc: "Remove args and make less than 3 arguments",
              fix: function (fixer) {
                return fixer.removeRange([
                  node.params[3].range[0],
                  node.params[node.params.length - 1].range[1],
                ]);
              },
            },
          ],
        });
      }
    }
    // Check "checkParams" for all function types
    return {
      FunctionExpression: checkParams,
      FunctionDeclaration: checkParams,
      ArrowFunctionExpression: checkParams,
    };
  },
};

export { avoidName, avoidUsingEval, avoidMoreThaThreeArgs };
