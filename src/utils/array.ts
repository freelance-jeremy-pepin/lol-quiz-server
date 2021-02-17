/**
 * Shuffles array in place.
 * src: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * @param {Array} array items An array containing the items.
 * @param numberShuffle
 */
// eslint-disable-next-line
export function shuffleArray(array: any[], numberShuffle: number = 1): any[] {
    const arrayShuffled = [...array];

    for (let y = 0; y < numberShuffle; y++) {
        let j;
        let x;
        let i;

        for (i = arrayShuffled.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = arrayShuffled[i];
            arrayShuffled[i] = arrayShuffled[j];
            arrayShuffled[j] = x;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return arrayShuffled;
}
