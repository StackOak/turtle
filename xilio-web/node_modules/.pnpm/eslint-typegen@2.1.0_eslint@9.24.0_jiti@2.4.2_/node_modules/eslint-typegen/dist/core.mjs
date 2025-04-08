import { normalizeIdentifier, compile } from 'json-schema-to-typescript-lite';

async function flatConfigsToPlugins(configs, options = {}) {
  const plugins = {};
  for (const config of configs) {
    if (!config.plugins)
      continue;
    if (options.filterConfig?.(config) === false)
      continue;
    for (const [name, plugin] of Object.entries(config.plugins)) {
      if (options.filterPlugin?.(name, plugin) === false)
        continue;
      plugins[name] = plugin;
    }
  }
  return plugins;
}
async function flatConfigsToRulesDTS(configs, options = {}) {
  return pluginsToRulesDTS(
    await flatConfigsToPlugins(configs, options),
    options
  );
}
async function pluginsToRulesDTS(plugins, options = {}) {
  const {
    includeTypeImports = true,
    includeIgnoreComments = true,
    includeAugmentation = true,
    augmentFlatConfigUtils = false,
    exportTypeName = "RuleOptions",
    compileOptions = {},
    configNames = []
  } = options;
  const rules = [];
  for (const [pluginName, plugin] of Object.entries(plugins)) {
    for (const [ruleName, rule] of Object.entries(plugin.rules || {})) {
      if (rule?.meta) {
        rules.push([
          pluginName ? `${pluginName}/${ruleName}` : ruleName,
          rule
        ]);
      }
    }
  }
  rules.sort(([a], [b]) => a.localeCompare(b));
  const resolved = await Promise.all(rules.map(([name, rule]) => compileRule(name, rule, compileOptions)));
  const exports = [
    ...includeIgnoreComments ? [
      "/* eslint-disable */",
      "/* prettier-ignore */"
    ] : [],
    ...includeTypeImports ? [
      "import type { Linter } from 'eslint'"
    ] : [],
    ...includeAugmentation ? [
      "",
      `declare module 'eslint' {`,
      `  namespace Linter {`,
      `    interface RulesRecord extends ${exportTypeName} {}`,
      `  }`,
      `}`
    ] : [],
    ...augmentFlatConfigUtils && configNames.length ? [
      "",
      "// @ts-ignore - In case the package is not installed",
      `declare module 'eslint-flat-config-utils' {`,
      `  interface DefaultConfigNamesMap {`,
      ...configNames.map((name) => `    '${name}'?: true,`),
      `  }`,
      `}`
    ] : [],
    "",
    `export interface ${exportTypeName} {`,
    ...resolved.flatMap(({ typeName, name, jsdoc }) => [
      jsdoc?.length ? `  /**
${jsdoc.map((i) => `   * ${i}`).join("\n").replaceAll(/\*\//g, "*\\/")}
   */` : void 0,
      `  '${name}'?: Linter.RuleEntry<${typeName}>`
    ]).filter(Boolean),
    `}`
  ];
  const typeDeclarations = resolved.flatMap(({ typeDeclarations: typeDeclarations2 }) => typeDeclarations2).join("\n");
  return [
    ...exports,
    "",
    "/* ======= Declarations ======= */",
    typeDeclarations
  ].join("\n");
}
async function compileRule(ruleName, rule, compileOptions = {}) {
  const meta = rule.meta ?? {};
  let schemas = meta.schema ?? [];
  if (!Array.isArray(schemas))
    schemas = [schemas];
  const id = normalizeIdentifier(ruleName);
  const jsdoc = [];
  if (meta.docs?.description)
    jsdoc.push(meta.docs.description);
  if (meta.docs?.url)
    jsdoc.push(`@see ${meta.docs.url}`);
  if (meta.deprecated)
    jsdoc.push("@deprecated");
  if (!meta.schema || !schemas.length) {
    return {
      jsdoc,
      name: ruleName,
      typeName: "[]",
      typeDeclarations: []
    };
  }
  let lines = [];
  const schema = Array.isArray(meta.schema) ? { type: "array", items: meta.schema, definitions: meta.schema?.[0]?.definitions } : meta.schema;
  try {
    const compiled = await compile(schema, id, {
      unreachableDefinitions: false,
      strictIndexSignatures: true,
      customName(schema2, keyName) {
        const resolved = schema2.title || schema2.$id || keyName;
        if (resolved === id) {
          return id;
        }
        if (!resolved)
          return void 0;
        return `_${normalizeIdentifier(`${id}_${resolved}`)}`;
      },
      ...compileOptions
    });
    lines.push(
      compiled.replace(/\/\*[\s\S]*?\*\//g, "")
    );
  } catch (error) {
    console.warn(`Failed to compile schema ${ruleName} for rule ${ruleName}. Falling back to unknown.`);
    console.error(error);
    lines.push(`export type ${ruleName} = unknown
`);
  }
  lines = lines.join("\n").split("\n").map((line) => line.replace(/^(export )/, "")).filter(Boolean);
  lines.unshift(`// ----- ${ruleName} -----`);
  return {
    name: ruleName,
    jsdoc,
    typeName: id,
    typeDeclarations: lines
  };
}

export { compileRule, flatConfigsToPlugins, flatConfigsToRulesDTS, pluginsToRulesDTS };
