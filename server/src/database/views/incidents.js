var by_incidentId = {
    map: function (doc) {
        if (doc.incidentId) {
            emit(doc.incidentId);
        }

    }
};

var by_creator = {
    map: function (doc) {
        if (doc.createBy.userId) {
            emit(doc.createBy.userId);
        }
    }
}

var by_assignee = {
    map: function (doc) {
        if (doc.assignee.userId) {
            emit(doc.assignee.userId);
        }
    }
}

module.exports = { by_assignee, by_creator, by_incidentId }