import Realm from 'realm';

const UserSchema = {
    name: "User",
    properties: {
        userName: "string",
        firstName: "string",
        lastName: "string",
        salt: "string",
        password: "string"
    },
    primaryKey: "userName",
}

const PostSchema = {
    name: "Post",
    properties: {
        _id: "uuid",
        userName: "string",
        time: "date",
        image: "string",
        video: "string",
        text: "string"
    },
    primaryKey: "_id",
}

const CommentSchema = {
    name: "Comment",
    properties: {
        _id: "uuid",
        post_id: "uuid",
        userName: "string",
        time: "date",
        text: "string"
    },
    primaryKey: "_id",
};

// Declare Book Schema
const VoteSchema = {
    name: "Vote",
    properties: {
        _id: "uuid",
        post_id: "uuid",
        userName: "string"
    },
    primaryKey: "_id",
};

// Create realm
export const realmDB = new Realm({
    schema: [UserSchema, PostSchema, CommentSchema, VoteSchema],
    schemaVersion: 9,
    /*migration: (oldRealm, newRealm) => {
        //Needed if Database Model changed
    }*/
});
