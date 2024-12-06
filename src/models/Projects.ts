import {Schema, model, Document} from 'mongoose';

//Définir une interface
interface IProjects extends Document {
    name: string;
    description: string;
    status: 'planned' | 'in-progress' | 'completed';
    createdAt: Date;
}


//définir notre schéma
const projectsSchema = new Schema<IProjects>({
    name: {type: String, required: true},
    description: {type: String},
    status:{type:String, default: "planned",  enum: ['planned', 'in-progress', 'completed']},
    createdAt: {type: Date, default: Date.now}
})

//Créer notre model
const Project = model<IProjects>('Projects', projectsSchema);

export default Project