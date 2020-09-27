import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';

// En httpLink le decimos a nuestra aplicación de React hacia donde se va a conectar para obtener los datos.

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    fetch
});

// Agregamos nuestro Token y lo pasamos vía headers con el Hook setContext en la función authLink.
// Esta función nos va a permitir modificar los headers y agregar headers nuevos

const authLink = setContext((_, { headers }) => {

    // Podemos leer el storage almacenado

    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

// En la función client conectamos nuestra aplicación de React a ApolloClient

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;