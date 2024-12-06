import {Schema, model, Document} from 'mongoose';

//Définir une interface
interface ITasks extends Document {
    projectId: Schema.Types.ObjectId;
    title: string;
    done: boolean;
    dueDate: Date; 
}


//définir notre schéma
const tasksSchema = new Schema<ITasks>({
    projectId: {type: Schema.Types.ObjectId, ref: 'Projects', required: true},
    title: {type: String, required: true},
    done: {type: Boolean, default: false},
    dueDate: {type: Date}
})

tasksSchema.index({title:'text'})

//Créer notre model
const Task = model<ITasks>('Tasks', tasksSchema);

export default Task