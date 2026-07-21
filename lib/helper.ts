import { Decimal } from "@prisma/client/runtime/library";

export function formatCurrency(
    amount: number | Decimal,
    currency: string = "INR",
    locale: string = "en-IN"
) {
    amount = Number(amount);
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatLastChanged(pastDate: Date) {
    const date = new Date(pastDate);
    const today = new Date();
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30.44; // Average days in a month
    const msPerYear = msPerDay * 365.25;

    const elapsed = date.getTime() - today.getTime();

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });

    // Math.round converts the decimal difference into integers
    if (Math.abs(elapsed) < msPerMinute) {
        return `Last changed ${rtf.format(Math.round(elapsed / 1000), 'second')}`;
    } else if (Math.abs(elapsed) < msPerHour) {
        return `Last changed ${rtf.format(Math.round(elapsed / msPerMinute), 'minute')}`;
    } else if (Math.abs(elapsed) < msPerDay) {
        return `Last changed ${rtf.format(Math.round(elapsed / msPerHour), 'hour')}`;
    } else if (Math.abs(elapsed) < msPerMonth) {
        return `Last changed ${rtf.format(Math.round(elapsed / msPerDay), 'day')}`;
    } else if (Math.abs(elapsed) < msPerYear) {
        return `Last changed ${rtf.format(Math.round(elapsed / msPerMonth), 'month')}`;
    } else {
        return `Last changed ${rtf.format(Math.round(elapsed / msPerYear), 'year')}`;
    }

}

export function encodeState(state: any) {
    return Buffer.from(JSON.stringify(state)).toString("base64");
}

export function decodeState(state: string) {
    return JSON.parse(Buffer.from(state, "base64").toString());
}

export function timeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffSeconds < 60) return "just now";
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffWeeks < 5) return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
    if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
}