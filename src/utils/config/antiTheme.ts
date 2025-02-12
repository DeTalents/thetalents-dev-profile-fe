// import type { ThemeConfig } from 'antd';
// import { theme } from 'antd';

// export const config: ThemeConfig = {
//   algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm], // Changed to defaultAlgorithm instead of darkAlgorithm
//   token: {
//     colorPrimary: '#4F46E5',
//     // Form background color matching your current design
//     colorBgContainer: '#ffffff', // White background for components
//     colorBgElevated: '#ffffff', // White background for elevated components like modals
//     // Border styles
//     borderRadius: 34, // Matching your rounded-[34px]
//     // Other colors
//     colorText: '#1e1b4b', // indigo-950 equivalent for text
//     colorTextSecondary: '#71717a', // zinc-500 equivalent for secondary text
//   },
//   components: {
//     Modal: {
//       paddingContentHorizontal: 48,
//       paddingContentVertical: 40,
//     },
//   },
// };

import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

export const config: ThemeConfig = {
  algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm],
  token: {
    colorPrimary: '#4F46E5',
    // Background colors
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    // Text colors
    colorText: '#1e1b4b', // Dark indigo for primary text
    colorTextSecondary: '#71717a', // Gray for secondary text
    // Input colors
    colorTextPlaceholder: '#9ca3af', // Gray for placeholder text
    controlItemBgHover: '#f3f4f6', // Light gray for hover states
    // Border colors
    colorBorder: '#e5e7eb', // Light gray for borders
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
