import mongoose from "mongoose";

interface IUser {
    name: string;
    uid: string;
    photo?: string;
    kids: boolean;
}
  
interface UserModelInterface extends mongoose.Model<UserDoc> {
    build(attr: IUser): UserDoc
}
  
interface UserDoc extends mongoose.Document {
    name: string;
    uid: string;
    photo?: string;
    kids: boolean;
}

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    uid: {
        type: String, 
        required: true
    },
    photo: {
        type: String, 
    },
    kids: {
        type: Boolean
    }
})

profileSchema.statics.build = (attr: IUser) => {
    return new UserModel(attr)
}

const UserModel = mongoose.model<UserDoc, UserModelInterface>('User', profileSchema)


export { UserModel }