import { appTools, defineConfig } from '@modern-js/app-tools';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig(async () => {
  const UnoCSS = await import('@unocss/webpack');
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
    ],
    tools: {
      webpackChain: async chain => {
        chain.plugin('unocss').use(UnoCSS.default());
      },
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
