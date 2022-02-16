const CommentSchema = {
    name: "Comments",
    properties: {
        _id: "objectId",
        user_id: "objectId",
        time: "string?",
        text: "string"
    },
    primaryKey: "_id",
};

const realm = await Realm.open({
    path: "myrealm",
    schema: [CommentSchema],
});
