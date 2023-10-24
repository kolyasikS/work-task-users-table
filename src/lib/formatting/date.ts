export const formatYear = (date: string) => {
    let dateValues = date.split('-');
    const currentYear = new Date().getFullYear().toString().substring(2, 4);
    const yearOfDate = dateValues[dateValues.length - 1];
    if (+yearOfDate > +currentYear) {
        dateValues[dateValues.length - 1] = '19' + yearOfDate;
    } else {
        dateValues[dateValues.length - 1] = '20' + yearOfDate;
    }

    return dateValues.join('-');
}