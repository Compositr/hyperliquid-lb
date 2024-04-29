# Hyperliquid Leaderboard Scraper

This script scrapes the leaderboard data from [Hyperliquid](https://app.hyperliquid.xyz/leaderboard) and adds up the PnL of all the traders. As per their website **the leaderboard excludes accounts with less than 10k USDC account value and less than 1M USDC trading volume**.

## How it Works
The script fetches the leaderboard via the API endpoint (https://api-ui.hyperliquid.xyz/info). This is the same endpoint that the website uses to fetch the leaderboard data and display it. It then tallies up the numbers using `Array.prototype.reduce` and Bignumber.js library to avoid floating point errors and handle the large numbers.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run .
```
