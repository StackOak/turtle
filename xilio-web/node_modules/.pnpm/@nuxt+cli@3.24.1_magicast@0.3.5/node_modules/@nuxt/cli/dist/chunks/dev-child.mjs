import process from 'node:process';
import { defineCommand } from 'citty';
import defu from 'defu';
import { resolve } from 'pathe';
import { isTest } from 'std-env';
import { _ as _getDevServerOverrides, a as _getDevServerDefaults, c as createNuxtDevServer } from './dev2.mjs';
import { o as overrideEnv } from '../shared/cli.DuKXzN7b.mjs';
import { b as legacyRootDirArgs, d as dotEnvArgs, e as envNameArgs, l as logLevelArgs, c as cwdArgs, a as logger } from '../shared/cli.DO-hhIWQ.mjs';
import 'node:events';
import 'chokidar';
import 'h3';
import 'jiti';
import 'listhen';
import 'perfect-debounce';
import 'ufo';
import '../shared/cli.BbtoZ3q0.mjs';
import 'node:fs';
import '../shared/cli.DlcAx0De.mjs';
import '../shared/cli.BuiklcMr.mjs';
import 'ohash';
import 'youch';
import 'node:path';
import 'consola';
import 'consola/utils';
import 'node:url';

const devChild = defineCommand({
  meta: {
    name: "_dev",
    description: "Run Nuxt development server (internal command to start child process)"
  },
  args: {
    ...cwdArgs,
    ...logLevelArgs,
    ...envNameArgs,
    ...dotEnvArgs,
    ...legacyRootDirArgs
  },
  async run(ctx) {
    if (!process.send && !isTest) {
      logger.warn("`nuxi _dev` is an internal command and should not be used directly. Please use `nuxi dev` instead.");
    }
    overrideEnv("development");
    const cwd = resolve(ctx.args.cwd || ctx.args.rootDir);
    const devContext = JSON.parse(process.env.__NUXT_DEV__ || "null") || {};
    function sendIPCMessage(message) {
      if (process.send) {
        process.send(message);
      } else {
        logger.info(
          "Dev server event:",
          Object.entries(message).map((e) => `${e[0]}=${JSON.stringify(e[1])}`).join(" ")
        );
      }
    }
    process.once("unhandledRejection", (reason) => {
      sendIPCMessage({ type: "nuxt:internal:dev:rejection", message: reason instanceof Error ? reason.toString() : "Unhandled Rejection" });
      process.exit();
    });
    const devServerOverrides = _getDevServerOverrides({
      public: devContext.public
    });
    const devServerDefaults = _getDevServerDefaults({
      hostname: devContext.hostname,
      https: devContext.proxy?.https
    }, devContext.publicURLs);
    const nuxtDev = await createNuxtDevServer({
      cwd,
      overrides: defu(ctx.data?.overrides, devServerOverrides),
      defaults: devServerDefaults,
      logLevel: ctx.args.logLevel,
      clear: !!ctx.args.clear,
      dotenv: { cwd, fileName: ctx.args.dotenv },
      envName: ctx.args.envName,
      port: process.env._PORT ?? void 0,
      devContext
    });
    nuxtDev.on("loading:error", (_error) => {
      sendIPCMessage({ type: "nuxt:internal:dev:loading:error", error: {
        message: _error.message,
        stack: _error.stack,
        name: _error.name,
        code: _error.code
      } });
    });
    nuxtDev.on("loading", (message) => {
      sendIPCMessage({ type: "nuxt:internal:dev:loading", message });
    });
    nuxtDev.on("restart", () => {
      sendIPCMessage({ type: "nuxt:internal:dev:restart" });
    });
    nuxtDev.on("ready", (payload) => {
      sendIPCMessage({ type: "nuxt:internal:dev:ready", port: payload.port });
    });
    await nuxtDev.init();
  }
});

export { devChild as default };
