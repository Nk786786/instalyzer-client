export const numberWithUnit = function (number) {
    if (number >= 1000 && number < 1000000) {
        return parseInt(number / 1000) + 'K';
    } else if (number >= 1000000) {
        return parseInt(number / 1000000) + 'M';
    }

    return number;
}