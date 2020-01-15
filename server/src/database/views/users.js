var by_role = {
    map: function (doc) {
        if (doc.role.code) {
            emit(doc.role.code);
        }
    }
};

var by_id = {
    map: function (doc) {
        if (doc.userId) {
            emit(doc.userId);
        }
    }
};

module.exports = { by_role, by_id }