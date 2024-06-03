import { ProfileModel } from "../models/Profile";

interface IProfile {
    uid: string;
}

export async function GetProfileController(body : IProfile) {
    
    const {uid} = body;
    
    if(!uid) throw new Error("Missing profile fields");
    
    const profiles = await ProfileModel.find({ uid });
    
    return profiles;
}

