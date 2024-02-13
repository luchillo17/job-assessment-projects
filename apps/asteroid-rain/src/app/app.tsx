// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import Button from '@mui/material/Button';

import NxWelcome from './nx-welcome';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import GameWrapper from '../components/game-wrapper/game-wrapper';

export function App() {
  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Asteroid Rain
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Container component="main">
        <Stack spacing={3} py={3}>
          <Typography>
            Asteroid Rain is a little game made in Phaser where you control a
            spaceship to avoid asteroids.
          </Typography>

          <Typography>
            The objective is simple, use WASD or the arrow keys to move and
            avoid the asteroids, the game is infinite and the score is
            calculated by how many asteroids you manage to avoid.
          </Typography>

          <GameWrapper />
        </Stack>
      </Container>
    </>
  );
}

export default App;

if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html

  const { it, expect, beforeEach } = import.meta.vitest;
  let render: typeof import('@testing-library/react').render;

  beforeEach(async () => {
    render = (await import('@testing-library/react')).render;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Welcome asteroid-rain/gi)).toBeTruthy();
  });
}
