import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose'
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import auth from './middleware/auth';


const port = process.env.PORT || 3000;

const connect = async () => {
    /* Connect to mongodb */
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-5ui2q.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
    try { 
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    }
    catch { 
        console.log(`Couldn't connect mongoose to MongoDB`);
    }
}
const development = async (): Promise<void> => {
    /* Development Config  */
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
        context: auth
    });

    await connect();
    const { url } = await server.listen({ port });
    console.log(`🚀  Server ready at ${url}`);
}

development();
