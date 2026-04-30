# ascii-server

Node.js server for ascii animation. Inspired from hugomd/ascii-live.

## Running

1. Install Node.js 24 or higher and Git.
2. Enable `corepack`.
   ```text
   corepack enable
   ```
3. Fork and clone this repository.
4. Install the packages
   ```text
   pnpm install
   ```
5. Run the server
   ```text
   pnpm run server
   ```

## Configuring

We use enviroment variables for configuring.

- `PORT`: Host port, default `8080`
- `INTERVAL`: Animation interval, default `100`

To set it, you can create `config.env` file on the root and set some options.

## License

GPL-3.0
