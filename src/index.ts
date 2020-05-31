import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";
import { Route } from "./shared/types";

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(bodyParser.json());

    // register all application routes
    AppRoutes.forEach((route: Route) => {
      app[route.method](
        route.path,
        (request: Request, response: Response, next: Function) => {
          route
            .action(request, response)
            .then(() => next)
            .catch((err: any) => next(err));
        }
      );
    });

    app.listen(3000);

    console.log("Express application is up and running on port 3000");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
