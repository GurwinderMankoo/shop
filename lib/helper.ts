export function formatCurrency(
    amount: number,
    currency: string = "INR",
    locale: string = "en-IN"
) {
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