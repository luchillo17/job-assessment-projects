import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

import { theme } from '../app/theme';

/* eslint-disable-next-line */
export interface ThemeRegistryProps {}

export function ThemeRegistry({
  children,
}: PropsWithChildren<ThemeRegistryProps>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}

export default ThemeRegistry;
