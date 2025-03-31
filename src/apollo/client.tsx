// Container component
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://fioduardo.us-east-a.ibm.stepzen.net/api/youngling-jaguar/graphql',
  headers: {
    'Authorization':'apikey fioduardo::local.net+1000::1ecb6fe659a35cb770d9dc4dc75ad4916f15a1066555bce539a8d6966c062c67'
},
  cache: new InMemoryCache(),
});

export default client;