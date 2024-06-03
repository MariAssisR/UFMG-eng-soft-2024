import mongoose from "mongoose";

interface IProfile {
    name: string;
    uid: string;
    photo?: string;
    kids: boolean;
}
  
interface ProfileModelInterface extends mongoose.Model<ProfileDoc> {
    build(attr: IProfile): ProfileDoc
}
  
interface ProfileDoc extends mongoose.Document {
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

profileSchema.statics.build = (attr: IProfile) => {
    return new ProfileModel(attr)
}

const ProfileModel = mongoose.model<ProfileDoc, ProfileModelInterface>('Profile', profileSchema)


export { ProfileModel }