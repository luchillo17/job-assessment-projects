// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import GameWrapper from '../components/game-wrapper/game-wrapper';

export function App() {
  return (
    <Stack height="100%">
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Asteroid Rain
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1 }}>
        <Stack spacing={3} py={3} height="100%">
          <Typography variant="h1">Asteroid Rain</Typography>

          <Typography variant="subtitle1">
            by Carlos Esteban Lopez Jaramillo
          </Typography>

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
    </Stack>
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

  it('should have Asteroid Rain as title', () => {
    const { getAllByText } = render(<App />);
    expect(getAllByText('Asteroid Rain')[0]).toBeTruthy();
  });
}
