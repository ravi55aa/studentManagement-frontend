export function generateFeeCode(name: string): string {
    if (!name) return "";

    return name
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9\s]/g, "")  // remove special characters
        .split(/\s+/)                 // split words
        .map(word => word.slice(0, 3)) // take first 3 letters
        .join("-");
}
