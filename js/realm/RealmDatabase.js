import Realm from 'realm';

const UserSchema = {
    name: "Users",
    properties: {
        _id: "objectId",
        userName: "string",
        firstName: "string",
        lastName: "string",
        salt: "string",
        password: "string"
    },
    primaryKey: "_id",
}

const PostSchema = {
    name: "Posts",
    properties: {
        _id: "objectId",
        user_id: "objectId",
        time: "string",
        text: "string"
    },
    primaryKey: "_id",
}

const CommentSchema = {
    name: "Comments",
    properties: {
        _id: "objectId",
        post_id: "objectId",
        user_id: "objectId",
        time: "string?",
        text: "string"
    },
    primaryKey: "_id",
};

// Declare Book Schema
const VoteSchema = {
    name: "Votes",
    properties: {
        _id: "objectId",
        post_id: "objectId",
        user_id: "objectId",
        vote: "int"
    },
    primaryKey: "_id",
};

// Create realm
export const realm = new Realm({schema: [UserSchema, PostSchema, CommentSchema, VoteSchema], schemaVersion: 1});
