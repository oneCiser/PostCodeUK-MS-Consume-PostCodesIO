## # (PostCodes UK) Consume PostCode.io

This is a microservice mounted on **ExpressJS** that receives a point (longitude and latitude) and returns the information of two zip codes: the first one is the closest zip code to the given point and the second one is the closest zip code to the first one if it exists.
## Project

The project information can be found at the following link: [PostCodes UK]()

## Commands

### Deploy Server
To build the server


    $ npm run build


To start the server


    $ npm start


### Development

Run tests


    $ npm run tests


Run the server and update changes

    $ npm run tsc
    $ npm run dev


## .env files

.env files should not be saved in the repositories. In this case they are stored for didactic purposes.
- **.env** for server deployment
- **.env.dev** in the development process

## Author
- [@oneCiser](https://github.com/oneCiser)