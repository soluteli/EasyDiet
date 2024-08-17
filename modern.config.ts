// import PostCSSUnoCSS from '@unocss/postcss';
import { appTools, defineConfig } from '@modern-js/app-tools';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig(async () => {
  const UnoCSS = await import('@unocss/webpack');
  return {
    runtime: {
      router: true,
    },
    plugins: [
      appTools({
        bundler: 'webpack', // Set to 'experimental-rspack' to enable rspack ⚡️🦀
      }),
    ],
    tools: {
      // postcss: opts => {
      //   opts?.postcssOptions?.plugins?.push(PostCSSUnoCSS())
      // },
      webpackChain: async chain => {
        chain.plugin('unocss').use(UnoCSS.default());
      },
    },
  };
});
