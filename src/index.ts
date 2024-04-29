import BigNumber from "bignumber.js";

const data: Leaderboard = await fetch("https://api-ui.hyperliquid.xyz/info", {
	method: "POST",
	body: JSON.stringify({ type: "leaderboard" }),
	headers: {
		"Content-Type": "application/json",
	},
}).then((res) => res.json());

const rows = data.leaderboardRows;

console.log(`Fetched ${rows.length} rows from the leaderboard`);

// Tally PnL
const totalPnL = rows.reduce((acc, row) => {
	return new BigNumber(
			row.windowPerformances.find(([type]) => type === "allTime")?.[1].pnl ?? 0,
		).plus(acc);
}, new BigNumber(0));
const oneDayPnL = rows.reduce((acc, row) => {
	return new BigNumber(
			row.windowPerformances.find(([type]) => type === "day")?.[1].pnl ?? 0,
		).plus(acc);
}, new BigNumber(0));

console.table({
  "Total PnL": totalPnL.toString(),
  "One Day PnL": oneDayPnL.toString(),
});

export interface Leaderboard {
	leaderboardRows: LeaderboardRow[];
}

export interface LeaderboardRow {
	accountValue: string;
	displayName: null | string;
	ethAddress: string;
	prize: number;
	windowPerformances: Array<[WindowPerformanceEnum, WindowPerformanceClass]>;
}

export interface WindowPerformanceClass {
	pnl: string;
	roi: string;
	vlm: string;
}

export enum WindowPerformanceEnum {
	AllTime = "allTime",
	Day = "day",
	Month = "month",
	Week = "week",
}
