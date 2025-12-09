const plugin = {
  // preferred location of name and version
  meta: {
    name: "eslint-plugin-example",
    version: "1.2.3",
    namespace: "example",
  },
  rules: {
    "foo-rule": {
      meta: {
        type: "suggestion",
        docs: {
          description:
            "An example rule that suggests using 'foo' instead of 'bar'.",
          category: "Best Practices",
          recommended: false,
        },
        schema: [], // no options
      },
      create(context) {
        return {
          Identifier(node) {
            if (node.name === "bar") {
              context.report({
                node,
                message: "Use 'foo' instead of 'bar'.",
              });
            }
          },
        };
      },
    },
  },
};

export default plugin;
