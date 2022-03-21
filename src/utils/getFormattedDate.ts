import moment from 'moment';

export const getReadableDate = (dateToFormat: string) => {
    let formattedDate = moment(new Date(dateToFormat));
    return formattedDate.fromNow()

}