import { ProfileModel } from "../models/Profile";

interface IProfile {
    name: string;
    uid: string;
    photo?: string;
    kids: boolean;
}

export async function AddProfileController(body : IProfile) {
    
    const {name, uid, photo, kids} = body;

    if(!name || !uid || !kids) throw new Error("Missing profile fields");

    const newProfile = new ProfileModel({name, uid, photo, kids});
    await newProfile.save();
    return newProfile;
}