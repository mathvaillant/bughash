const _ = require('underscore');    

exports.mapBreakDownByTimeWorked = async (timeWorkedData) => {
    return new Promise((resolve, reject) => {
        const result = timeWorkedData.reduce((acc, item) => {
            if(_.flatten(item.timeWorked).length) {
                return [...acc, { bugTitle: item._id, timeWorked: _.flatten(item.timeWorked)[0].timeWorked, bugId: item.bugId[0]}]
            }
            return acc;
        }, []);
        
        resolve(result);
    })
}

exports.mapBreakDownByStatus = async (statusData) => {
    return new Promise((resolve, reject) => {
        const result = statusData.map(item => ({ status: item._id, amount: item.amount}));
        resolve(result);
    })
}