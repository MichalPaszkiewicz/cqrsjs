import * as mongoose from 'mongoose';
import * as Projections from '../projections';

var projectionStore = Projections.ProjectionStore.Instance;
export function setupMongooseProjectionStore(connectionString: string){

    mongoose.connect(connectionString);

}