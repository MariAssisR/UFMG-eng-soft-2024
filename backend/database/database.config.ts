import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.DBSTRING ?? ''

mongoose.connect(uri);

export default mongoose