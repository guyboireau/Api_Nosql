require('dotenv').config();

const express = require('express');

const server = express();

server.use(express.json())

// import routers 
const userRouter = require('./app/routes/userRouter');
const articleRouter = require('./app/routes/articleRouter');
const commentRouter = require('./app/routes/commentRouter')

server.use('/', userRouter);
server.use('/', articleRouter);
server.use('/', commentRouter);

const expressSwagger = require('express-swagger-generator') (server);

let options = {
    swaggerDefinition : {
        info : {
            description : "An blog api",
            title: "blog",
            version: '1.0.0'

        },
        host: `http://localhost:${process.env.PORT}`,
        basePath : '/',
        produces : [
            "application/json"
        ],
        schemes: ['http', 'https'],
    },
    basedir: __dirname,
    files: ['./app/**/*.js']
}

expressSwagger(options)
// accéder à la route :  http://localhost:3000/api-docs

server.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})