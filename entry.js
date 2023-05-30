import { lookup } from "mime-types";
import { existsSync, readFileSync } from "node:fs";

import manifest from "../../dist/public/route-manifest.json";
import handler from "./entry-server";

const { serve } = Bun;

serve({
  fetch: async (request) => {
    const { pathname } = new URL(request.url);
    process.env.NODE_ENV !== "production" && console.log(pathname);

    // This is how the server works:
    // 1. A request comes in for a specific asset.
    // 2. We read the asset from the file system.
    // 3. We send the asset back to the client.

    const filename = `${import.meta.dir}/public${pathname}`;
    if (existsSync(filename)) {
      try {
        const file = readFileSync(filename);
        const isAsset = pathname.startsWith("/assets/");

        // Respond to the request with the style.css file.
        return new Response(file, {
          headers: {
            "content-type": lookup(filename),
            ...(isAsset
              ? {
                  "cache-control": "public, immutable, max-age=31536000",
                }
              : {}),
          },
        });
      } catch (e) {}
    }

    return await handler({
      request: request,
      // clientAddress: connInfo?.remoteAddr?.hostname,
      locals: {},
      env: {
        manifest,
        getStaticHTML: async (path) => {
          process.env.NODE_ENV !== "production" && console.log(path);
          const filename = `${import.meta.dir}/public${path}.html`;
          if (!existsSync(filename))
            throw new Error("Unable to find specified static HTML file!");
          const text = readFileSync(filename);
          return new Response(text, {
            headers: {
              "content-type": "text/html",
            },
          });
        },
      },
    });
  },
  port: Number(Bun.env.PORT ?? "8080"),
});
