import { defineCommand } from 'citty';
import { b as legacyRootDirArgs, e as envNameArgs, d as dotEnvArgs, l as logLevelArgs, c as cwdArgs } from '../shared/cli.DO-hhIWQ.mjs';
import buildCommand from './build.mjs';
import 'node:path';
import 'node:process';
import 'std-env';
import 'consola';
import 'consola/utils';
import 'node:url';
import 'pathe';
import '../shared/cli.CgjRHmYF.mjs';
import 'pkg-types';
import '../shared/cli.DlcAx0De.mjs';
import 'jiti';
import '../shared/cli.DuKXzN7b.mjs';
import '../shared/cli.BbtoZ3q0.mjs';
import 'node:fs';

const generate = defineCommand({
  meta: {
    name: "generate",
    description: "Build Nuxt and prerender all routes"
  },
  args: {
    ...cwdArgs,
    ...logLevelArgs,
    preset: {
      type: "string",
      description: "Nitro server preset"
    },
    ...dotEnvArgs,
    ...envNameArgs,
    ...legacyRootDirArgs
  },
  async run(ctx) {
    ctx.args.prerender = true;
    await buildCommand.run(
      // @ts-expect-error types do not match
      ctx
    );
  }
});

export { generate as default };
