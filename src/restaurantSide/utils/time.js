export const convertTimestampToDate = (timestamp) => {
    if (!timestamp) {
        return 'N/A';
    }
    const formattedDate = timestamp.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
    return formattedDate;
};