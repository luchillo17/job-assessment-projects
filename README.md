# JobAssessmentProjects

This monorepo holds projects as assessments for job interviews, for readability each project is described in a collapsible section, just click on the title to expand.

<details>
  <summary><h1>Asteroid Rain Phaser 3 game</h1></summary>

### Asteroid Rain Phaser 3 game

Asteroid Rain is a little game made in Phaser where you control a spaceship to avoid asteroids, all this inside a React app.

The objective is simple, use WASD or the arrow keys to move and avoid the asteroids, the game is infinite and the score is calculated by how many asteroids you manage to avoid.

### Requirements

NodeJS and a package manager of choice (`npm`, `yarn` or `pnpm` are the most popular).

### Running the app

- Clone the repository.
- Install dependencies with your package manager (`pnpm i` or equivalent)
- Run the Nx serve command `pnpx nx asteroid-rain:serve` or equivalent in your package manager.
- The root of the React app should open the game page with more instructions.

</details>

---

<details>
  <summary><h1>Insurance policy manager API</h1></summary>

### Insurance policy manager

An Express API with PassportJS integrated, it only has local username-password strategy implemented, but its setup in a way that adding more strategies like Gihub SSO or Google SSO would be straightforward.

It uses Zod as schema validation library to ensure the policy json structure is exactly what our endpoints expect.

Lastly uses an in memory mongo database so we don't have to install one, downside is that the database is reset every time our server is shutdown.

### Requirements

The biggest one is having NodeJS > 16, the lockfile is from `pnpm` but should theoretically work with any package manager like `npm` and `yarn`.

### Running the server

1. Install dependencies with `pnpm i` or package manager of choice.
2. Run this command `pnpx nx run insurance-policy-manager:serve`.

### Testing the server

As an API any Rest Client will do, Postman is a good example, for simplicity, if you're using VSCode, install the REST Client extension, then you can open the `job-assessment-projects/apps/insurance-policy-manager/example.http`, you should be able to run those request with a click, there should be requests for signup, signin, CRUD for insurance policies, and 1 list GET request to get the whole collection, the last 2 request (the GET and PUT) need an existing MongoDB document id, so you need to create one and then get the id, paste it in the variable `policy_db_id` before running any of the 2.

</details>
