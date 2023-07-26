import clsx from 'clsx';
import './contribution-graph.css';

interface Props {
	caption?: string;
	contributions: Array<Array<[Date, number, boolean]>>;
	typeRange?: [number, number];
}

const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeZone: 'UTC' }).format;
const dayFullFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'UTC' }).format;
const dayShortFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'UTC' }).format;
const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' }).format;
const monthFormatFull = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' }).format;

export function ContributionGraph(props: Props) {
	const totals =
		props.contributions[0]?.reduce(
			(memo, [, , inRange], i) => {
				memo.push([
					props.contributions.reduce((memo, weekday) => {
						if (!weekday[i]) {
							return memo;
						}
						return memo + weekday[i]![1];
					}, 0),
					inRange,
				]);
				return memo;
			},
			[] as Array<[number, boolean]>,
		) ?? [];
	const max = Math.max(...totals.map(([t]) => t), 6);

	const months = props.contributions[0]!.reduce(
		(memo, [day]) => {
			if (day.getMonth() === memo[memo.length - 1]?.date.getMonth()) {
				memo[memo.length - 1]!.colSpan += 1;
			} else {
				memo.push({ date: day, colSpan: 1 });
			}
			return memo;
		},
		[] as Array<{ colSpan: number; date: Date }>,
	);

	return (
		<div class="contribution-graph not-prose overflow-scroll text-[10px] leading-none">
			<table>
				{props.caption ? <caption>{props.caption}</caption> : null}
				<thead>
					<tr>
						<th></th>
						{months.map(({ colSpan, date }) =>
							colSpan < 3 ? (
								<th colSpan={colSpan} />
							) : (
								<th role="columnheader" colSpan={colSpan}>
									<span aria-hidden>{monthFormat(date)}</span>
									<span class="sr-only">{monthFormatFull(date)}</span>
								</th>
							),
						)}
					</tr>
				</thead>
				<tbody>
					{props.contributions.map((dayOfWeek, w) => {
						return (
							<tr>
								<th role="rowheader">
									{!(w % 2) || w === 7 ? null : (
										<>
											<span class="sr-only">{dayFullFormat(dayOfWeek[0]![0])}</span>
											<span aria-hidden>{dayShortFormat(dayOfWeek[0]![0] ?? 0)}</span>
										</>
									)}
								</th>
								{dayOfWeek.map(([day, contributions, inRange]) => {
									const title = `${contributions} contributions on ${formatter(day)}`;
									return (
										<td class={clsx('day', opacity[contributions], getColor(inRange))} title={title}>
											<div class="h-2 w-2" />
											<span class="sr-only">{title}</span>
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<table>
				<caption>Number of contributions by week</caption>
				<tbody>
					<tr role="presentation">
						<th role="rowheader" />
						{totals.map(([value, inRange]) => {
							return (
								<td class="total-bar-cell">
									<div class="total-bar-container">
										<div
											style={{ 'flex-basis': `${Math.ceil((value / max) * 100)}%` }}
											class={clsx('total-bar', opacity[Math.floor((value / max) * 10)], getColor(inRange))}
										/>
									</div>
								</td>
							);
						})}
					</tr>
					<tr>
						<th role="rowheader">
							<span aria-hidden>Tot.</span>
							<span class="sr-only">Total</span>
						</th>
						{totals.map(([value]) => (
							<td class="total-bar-cell">
								<span class="total">{value}</span>
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	);
}

function weekInRange(week: number, range: [number, number] = [-1, 1000]) {
	return !range || (range[0] <= week && range[1] >= week);
}

function getColor(inRange: boolean) {
	return inRange ? 'in-range' : '';
}
function randomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min);
}

function randomIdeal(week: number, low = false) {
	if (week === 15 || week === 35 || week === 36 || week === 54 || Math.random() < 0.08) {
		return 0;
	}
	return randomInt(...(low ? idealLowRanges : idealRanges)[week % 4]!);
}

const idealRanges: Array<[number, number]> = [
	[0, 3],
	[2, 6],
	[2, 8],
	[4, 9],
];

const idealLowRanges: Array<[number, number]> = [
	[0, 1],
	[0, 2],
	[0, 3],
	[0, 3],
];

function randomBase(week: number) {
	return randomInt(...baseRanges[week % baseRanges.length]!);
}

const baseRanges: Array<[number, number]> = [
	[0, 1],
	[0, 1],
	[0, 2],
	[0, 3],
	[0, 4],
	[1, 4],
	[1, 3],
	[0, 2],
	[1, 5],
	[1, 8],
	[3, 7],
	[3, 5],
	[3, 8],
	[3, 7],
];

function randomSpecial() {
	return randomInt(1, 3);
}

const opacity = [
	'opacity-10',
	'opacity-20',
	'opacity-30',
	'opacity-40',
	'opacity-50',
	'opacity-60',
	'opacity-70',
	'opacity-75',
	'opacity-80',
	'opacity-90',
	'opacity-100',
];

const myContributions = [
	0, 0, 1, 3, 0, 3, 0, 0, 1, 4, 4, 2, 1, 0, 0, 1, 5, 11, 10, 0, 0, 0, 1, 0, 5, 3, 27, 0, 3, 3, 3, 1, 3, 6, 4, 5, 4, 14,
	4, 17, 13, 1, 0, 23, 23, 27, 36, 28, 13, 9, 14, 19, 36, 19, 28, 10, 10, 34, 8, 29, 37, 7, 12, 3, 50, 43, 30, 15, 29,
	17, 20, 28, 14, 10, 40, 26, 0, 18, 35, 45, 47, 8, 8, 0, 13, 30, 22, 9, 19, 34, 0, 5, 40, 26, 20, 17, 7, 0, 1, 32, 5,
	12, 12, 24, 0, 0, 31, 4, 9, 6, 0, 0, 0, 16, 1, 17, 6, 5, 0, 0, 18, 6, 7, 8, 23, 13, 0, 10, 1, 2, 2, 1, 0, 0, 8, 1, 3,
	2, 5, 0, 0, 32, 9, 10, 13, 3, 0, 0, 0, 9, 7, 1, 5, 0, 1, 20, 20, 9, 5, 7, 0, 0, 5, 6, 1, 0, 0, 0, 0, 0, 0, 6, 7, 6, 0,
	3, 3, 6, 3, 5, 7, 0, 18, 3, 3, 6, 7, 8, 1, 0, 3, 15, 19, 7, 9, 1, 4, 10, 4, 4, 3, 3, 3, 0, 6, 1, 2, 6, 10, 0, 0, 6, 1,
	6, 3, 8, 0, 0, 0, 0, 0, 0, 0, 0,
];

type Contributor =
	| 'full'
	| 'underperformer'
	| 'weekdays'
	| 'ideal'
	| 'ideal-low'
	| 'base'
	| 'build'
	| 'specialization'
	| 'mine';

export function getContributions({
	type,
	start = new Date(Date.UTC(2022, 6, 24)),
	end = new Date(Date.UTC(2023, 6, 30)),
	visibleRange,
}: {
	type: Contributor;
	start?: Date;
	end?: Date;
	visibleRange: [number, number];
}) {
	let day = new Date(start);
	const days: Array<Array<[Date, number, boolean]>> = [[], [], [], [], [], [], []];
	let weekNum = 0;
	let i = 0;
	while (day < end) {
		const dayOfWeek = day.getDay();
		let contributions = 0;
		if (type === 'full') {
			contributions = randomInt(3, 10);
		} else if (type === 'mine') {
			contributions = myContributions[i]!;
		} else if (dayOfWeek <= 4) {
			switch (type) {
				case 'weekdays':
					contributions = randomInt(1, 9);
					break;
				case 'underperformer':
					contributions = Math.round(Math.random() * 0.55);
					break;
				case 'ideal':
					contributions = randomIdeal(weekNum);
					break;
				case 'ideal-low':
					contributions = randomIdeal(weekNum, true);
					break;
				case 'base':
					contributions = weekInRange(weekNum, visibleRange) ? randomBase(weekNum) : randomIdeal(weekNum);
					break;
				case 'build':
					contributions = weekInRange(weekNum, visibleRange) ? randomIdeal(weekNum) : randomBase(weekNum);
					break;
				case 'specialization':
					contributions = weekInRange(weekNum, visibleRange) ? randomSpecial() : randomIdeal(weekNum);
					break;
			}
		}

		days[dayOfWeek]!.push([day, contributions, weekInRange(weekNum, visibleRange)]);
		day = new Date(day.setDate(day.getDate() + 1));
		weekNum += dayOfWeek === 6 ? 1 : 0;
		i += 1;
	}
	const sunday = days.pop();
	days.unshift(sunday!);
	return days;
}
