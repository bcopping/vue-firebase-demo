export const getDate = function() {
    var timestamp = new Date();
    const date = timestamp.getDate();
    const month = timestamp.getMonth() + 1;
    const year = timestamp.getFullYear();


    return date + '-' + month + '-' + year 
}