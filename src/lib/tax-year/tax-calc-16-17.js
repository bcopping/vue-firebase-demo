export const divTax1617 = (wageTotal, dividendTotal) => {

    const config = {
        pa : 11000,
        dta : 5000,
        brUpper : 32000,
        hrUpper: 150000,
        br: 7.5,
        hr: 32.5,
        ur: 38.1
    }

    /*--
        BR  7.5%
        HR  32.5%
        DTA 5000
        PA  11000   Can be split between Wages and Divs

        EXAMPLES
-------------------------------------------------------------------------------
                                Income  PA	    BR band
            Non-dividend(wage)  6,500	6,500   0
            Dividend            12,000	4,500	7,500
            Totals              18,500	11,000	7,500
            Less DA	 	 	                    (5,000)
            Taxed at 7.5%	 	 	            2,500
            Tax due	 	 	                    £187.50
-------------------------------------------------------------------------------
                                Income  PA	    BR band
            Non-dividend(wage)  12,000	11,000  1000
            Dividend            12,000	0       12,000
            Totals              24,000	11,000	13,000
            Less DA	 	 	                    (5,000)
            Taxed at 7.5%	 	 	            8,000
            Tax due
-------------------------------------------------------------------------------
                                Income  PA	    BR band     HR band
            Non-dividend(wage)  40,000	11,000  29,000
            Dividend            9,000	0       3,000       6,000
            Totals              49,000	11,000	32,000

            Dividend in BR/HR                   3,000       6,000
            Less DA	 	 	                    (3,000)     (2,000)
            Taxed at 32.5%	 	 	             0          4000
            Tax Due


    --*/

    if (wageTotal < config.pa) {
        let pa = config.pa - wageTotal
        let taxableDiv = dividendTotal - pa - config.dta

        //console.log('TAXABLE DIV AMOUNT is ', taxableDiv)

        if (taxableDiv < config.brUpper && taxableDiv > 0) {

            //console.log('tax due', (taxableDiv / 100) * config.br);
            return (taxableDiv / 100) * config.br
        }
        else {
            return 0
        }

    }


}

export const corpTax = (year, yrWages, yrExpenses, yrInvoices) => {

    const config = {
        y2016 : 20,
        y2017: 19,
        y2018: 18
    }

    let netProfit = yrInvoices - yrExpenses - yrWages

    switch (year) {
        case '2016':
            return (netProfit / 100) * config.y2016
        break;
        case '2017':
            return (netProfit / 100) * config.y2017
        break;
        case '2018':
            return (netProfit / 100) * config.y2018
        break;
    }




}


