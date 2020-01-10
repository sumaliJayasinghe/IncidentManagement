function generateId() {
    var number = Math.random() // 0.9394456857981651
    number.toString(36); // '0.xtis06h6'
    var id = number.toString(36).substr(2, 9); // 'xtis06h6'
    id.length >= 9;

    return id;
}

function structureResponse(status, data) {
    if (typeof data == "object" && data.length != undefined) {
        return {
            dataList: data,
            status: status
        }
    } else {
        return {
            data: data,
            status: status
        }
    }
}

module.exports = {
    generateId: generateId,
    structureResponse: structureResponse
}