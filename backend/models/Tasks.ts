import mongoose from "mongoose";

interface ITask {
    title: string;
    date: string;
}
  
interface TaskModelInterface extends mongoose.Model<TaskDoc> {
    build(attr: ITask): TaskDoc
}
  
interface TaskDoc extends mongoose.Document {
    title: string;
    date: string;
}

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String, 
        required: true
    }
})

taskSchema.statics.build = (attr: ITask) => {
    return new TaskModel(attr)
}

const TaskModel = mongoose.model<TaskDoc, TaskModelInterface>('Task', taskSchema)

TaskModel.build({
    title: 'some title',
    date: 'some description'
})

export { TaskModel }