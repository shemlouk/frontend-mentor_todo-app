import { plugin } from "bun";

plugin({
  name: "script-to-text",
  async setup(build) {
    build.onLoad({ filter: /\.(script\.js)$/ }, async ({ path }) => {
      const text = await Bun.file(path).text();

      return {
        exports: { text },
        loader: "object",
      };
    });
  },
});
