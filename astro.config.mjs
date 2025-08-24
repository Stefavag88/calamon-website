// astro.config.mjs
import { defineConfig } from "astro/config";
import { imageService } from "@unpic/astro/service";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  image: {
    service: imageService({
      placeholder: "blurhash",
      layout: "constrained",
    }),
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
