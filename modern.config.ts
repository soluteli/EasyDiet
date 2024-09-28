import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';
import { appTools, defineConfig } from '@modern-js/app-tools';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig(async () => {
  return {
    output: {
      distPath: {
        js: '',
        css: '',
        html: '',
      },
    },
    html: {
      disableHtmlFolder: true,
    },
    runtime: {
      router: true,
    },
    plugins: [
      appTools({
        bundler: 'webpack', // Set to 'experimental-rspack' to enable rspack ⚡️🦀
      }),
      tailwindcssPlugin(),
    ],
    tools: {
      htmlPlugin(config, { entryName }) {
        if (process.env.NODE_ENV === 'production') {
          if (entryName === 'main') {
            config.filename = `index.html`;
          }
        }
      },
    },
  };
});
