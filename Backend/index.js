const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {

        const token = req.headers['authorization'] || '';

        if (token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);

                return {
                    usuario
                }

            } catch (error) {
                console.log(`Hubo un error: ${error}`);
            };
        };
    }
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CRMGraphQL', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        try {
            console.log('La conexión a la Base de Datos se ha realizado con éxito!');
            server.listen().then(({ url }) => {
                try {
                    console.log(`Servidor listo en la URL: ${url}`);
                } catch (error) {
                    console.log(`Error al conectar con el servidor -- ${error}`);
                }
            });
        } catch (error) {
            console.log(`Error al conectar a la Base de Datos -- ${error}`);
        };
    });
