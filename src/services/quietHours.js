export function isQuietHours() {
    const now = new Date();
    const hour = now.getHours();

    // Quiet hours: 22:00 - 06:59
    return hour >= 22 || hour < 7;
}