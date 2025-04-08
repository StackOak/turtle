import { Linter } from 'eslint';
import { FlatConfigsToRulesOptions } from './core.mjs';
import 'json-schema-to-typescript-lite';

interface TypeGenOptions extends FlatConfigsToRulesOptions {
    /**
     * Include core rules in the generated types.
     *
     * @default true
     */
    includeCoreRules?: boolean;
    /**
     * Path to the generated types file.
     */
    dtsPath?: string;
}
/**
 * Wrap with resolved flat configs to generates types for rules.
 */
declare function typegen(configs: Promise<Linter.Config[]> | Linter.Config[], options?: TypeGenOptions): Promise<Linter.Config[]>;

export { type TypeGenOptions, typegen as default };
