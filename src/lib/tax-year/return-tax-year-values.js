export const taxYearVals = function(dates, values) {
    //values will be all the records (wages or divs to date)
    //dates is an object holding tax year start and end date you want the results between
    /*
        []
    */
    const startDate = dates.start
    const endDate = dates.end

    const taxYear = values.filter(function(item){
        return item >= startDate && item.date <= endDate
    });

    return taxYear
}
