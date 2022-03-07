import Realm from 'realm';

const UserSchema = {
    name: "User",
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
    name: "Post",
    properties: {
        _id: "objectId",
        user_id: "objectId",
        time: "string",
        text: "string"
    },
    primaryKey: "_id",
}

const CommentSchema = {
    name: "Comment",
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
    name: "Vote",
    properties: {
        _id: "objectId",
        post_id: "objectId",
        user_id: "objectId",
        vote: "int"
    },
    primaryKey: "_id",
};

// Create realm
export const realmDB = new Realm({schema: [UserSchema, PostSchema, CommentSchema, VoteSchema], schemaVersion: 2});
