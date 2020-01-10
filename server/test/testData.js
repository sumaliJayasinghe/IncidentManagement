var createRequest = {
    "doc": {
        "type": "Type_2",
        "decription": "John Doe",
        "criticality": "P1",
        "createBy": {
            "fullname": "Anne Jayasinghe",
            "userId": "anaj001",
            "email": "anne_j@incident-management.com"
        },
        "asignee": {
            "fullname": "Test User 1",
            "userId": "tsts001",
            "email": "test_j@incident-management.com"
        },
        "createDate": "2019-12-11",
        "updateDate": "2019-12-11",
        "updatedBy": {
            "fullname": "test_2",
            "userId": "swde002",
            "email": "swer_j@incident-management.com"
        },
        "status": "created"
    }
}

var updateRequest = {
    "doc": {
        "_id": "aa37c17553dd81126d903bed08001365",
        "_rev": "1-2037c7a28d3a189b7ed5819270c9f35b",
        "type": "Type_1",
        "decription": "Bill Ashley testing",
        "criticality": "P3",
        "createBy": {
            "fullname": "Anne Jayasinghe",
            "userId": "anaj001",
            "email": "anne_j@incident-management.com"
        },
        "asignee": {
            "fullname": "Test User 1",
            "userId": "tsts001",
            "email": "test_j@incident-management.com"
        },
        "createDate": "2019-12-11",
        "updateDate": "2019-12-11",
        "updatedBy": {
            "fullname": "test_2",
            "userId": "swde002",
            "email": "swer_j@incident-management.com"
        },
        "status": "closed"
    }
}

module.exports = { createRequest, updateRequest }

