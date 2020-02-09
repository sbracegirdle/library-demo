# Library demo app

This is a three-tier web application to be used for general educational purposes.

It has three sub-components:

* `ui` -- Tiny reactJS application for library management (Produces `sbracegirdle/library-ui` Docker image)
* `api` -- Tiny Typescript expressJS web server for REST web API (Produces `sbracegirdle/library-api` Docker image)
* `infra` -- Kubernetes assets

Functionality:

* List books
* Add a book
* Remove a book

## UI

Created with [create-react-app](https://create-react-app.dev/):

```s
npx create-react-app library-ui
```

See [library-ui/README.md] for more details.

## API

Created with yeoman generator [generator-express-no-stress](https://github.com/cdimascio/generator-express-no-stress):

```s
npm i -g generator-express-no-stress
yo express-no-stress library-api
```

See [library-api/README.md] for more details.

## Installation and pre-requisites

* NodeJS
* Docker

## License

MIT