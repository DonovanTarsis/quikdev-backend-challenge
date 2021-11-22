const swaggerAutogen = require('swagger-autogen');

swaggerAutogen()("./swagger.json", ["./src/router/router.js"]);
