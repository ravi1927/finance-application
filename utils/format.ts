export const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;
export const dateTime = (date: string, time: string) => `${date} • ${time}`;
