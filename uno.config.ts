import { defineConfig, presetUno, presetTypography } from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  },
  presets: [
    presetUno(),
    presetTypography({
      cssExtend: {},
    }),
  ],
});
