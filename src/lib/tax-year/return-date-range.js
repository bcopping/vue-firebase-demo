export const getDateRangeResults = function(startDate, endDate, values) {

    var resultRange = values.filter(function(item){
        return item.date >= startDate && item.date <= endDate
    });

    return resultRange

}
