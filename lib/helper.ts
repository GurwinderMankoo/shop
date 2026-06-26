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