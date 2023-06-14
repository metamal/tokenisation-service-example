# tokenisation-service-example
## Initial project setup
* Clone the repo.
* Set your node.js version to the one specified in the `.nvmrc` file.
* Install dependencies with `npm ci` command.
## Running unit tests
Once you have the project set up, run `npm test` command.
## Manual testing
* Start the service on port 3000 with `npm start` command.
* Test `/tokenize` endpoint with curl: `curl -X POST -H "Content-Type: application/json" -d '["4111-1111-1111-1111","4444-3333-2222-1111","4444-1111-2222-3333"]' http://localhost:3000/tokenize`
* Test `/detokenize` endpoint: `curl -X POST -H "Content-Type: application/json" -d '["b3f846b293cec081f0740bdaaecbea387754943b9e2ff6d83b8b459d1bbb43ac","0f7dc9af51859b2b3f85150755d4296e36d5b7881bbba9120260e20cefc88b52","9125724ec8da8f2b1c4d4cb487c23af2e60df6529cc4851bdf8bbd85bc65f709"]' http://localhost:3000/detokenize`
