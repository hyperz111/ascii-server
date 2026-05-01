# ascii-server

Node.js server for ascii animation. Adapted from [hugomd/ascii-live](https://github.com/hugomd/ascii-live).

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
- `INTERVAL`: Animation interval (in milliseconds), default `100`

To set it, you can create `config.env` file on the root and set some options.

Example:

```ini
# config.env
PORT=3000 # Use port 3000, so We will access localhost:3000
INTERVAL=200 # Set interval to 200ms per frame
```

## License

GPL-3.0
