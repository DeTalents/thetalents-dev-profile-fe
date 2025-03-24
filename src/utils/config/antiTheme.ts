import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

export const config: ThemeConfig = {
  algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm],
  token: {
    colorPrimary: '#4F46E5',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorText: '#1e1b4b',
    colorTextSecondary: '#71717a',
    colorTextPlaceholder: '#9ca3af',
    controlItemBgHover: '#f3f4f6',
    colorBorder: '#e5e7eb',
    borderRadius: 34,
  },
  components: {
    Modal: {
      paddingContentHorizontal: 48,
      paddingContentVertical: 40,
      titleColor: '#1e1b4b', // Dark color for modal title
    },
    Input: {
      colorText: '#1e1b4b', // Dark color for input text
      colorBgContainer: '#ffffff', // White background for inputs
    },
    // TextArea: {
    //   colorText: '#1e1b4b', // Dark color for textarea text
    //   colorBgContainer: '#ffffff', // White background for textarea
    // },
  },
};
