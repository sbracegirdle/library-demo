# Library app demo for Kubernetes guide


> What is it and why (expand into extra sub-sections with architectural overview etc if necessary)

This is a three-tier web application for demonstrative usage in my *Get a feel for Kubernetes* guide.

It has three sub-components:

* `library-ui` -- Tiny reactJS application for library management
* `library-api` -- Tiny Typescript expressJS web server for REST web API
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