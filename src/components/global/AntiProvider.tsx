'use client';

import { config } from '@/utils/config/antiTheme';
import { ConfigProvider } from 'antd';
import { PropsWithChildren } from 'react';

export function AntdProvider({ children }: PropsWithChildren) {
  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
}
