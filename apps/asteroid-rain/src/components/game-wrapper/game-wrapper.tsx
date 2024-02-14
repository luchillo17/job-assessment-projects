import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { gameConfig } from '../game/game';

/* eslint-disable-next-line */
export interface GameWrapperProps {}

export function GameWrapper(props: GameWrapperProps) {
  useEffect(() => {
    const game = new Phaser.Game(gameConfig);
    return () => {
      game.destroy(true);
    };
  }, []);
  return <Box id="asteroid-game" sx={{ flexGrow: 1 }}></Box>;
}

export default GameWrapper;

if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html

  const { it, expect, beforeEach } = import.meta.vitest;
  let render: typeof import('@testing-library/react').render;

  beforeEach(async () => {
    render = (await import('@testing-library/react')).render;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<GameWrapper />);
    expect(baseElement).toBeTruthy();
  });
}
