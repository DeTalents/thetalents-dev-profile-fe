import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

export const config: ThemeConfig = {
  algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
  token: {
    colorPrimary: '#FF7B47',
  },
};
