import { render } from '@testing-library/react';

import ThemeRegistry from './theme-registry';

describe('ThemeRegistry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeRegistry />);
    expect(baseElement).toBeTruthy();
  });
});
