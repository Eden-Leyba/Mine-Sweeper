export const generateRandomNumber : (min: number, max: number) => number = (max,min) => {
    const   minVal = Math.ceil(min),
            maxVal = Math.floor(max);
    return Math.floor(Math.random() * (maxVal-minVal) + minVal);
}

