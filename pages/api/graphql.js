import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
    type Query {
        hello: String
    }
`;


const resolvers = {
    Query: {
        hello() {
            return 'Hello';
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

export const config = {
    api: {
      bodyParser: false
    }
  };
  
  export default server.createHandler({ path: '/api/graphql' });
