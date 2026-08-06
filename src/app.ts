import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import router from "./routes";
import swaggerSpec from "./swagger";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use("/api", router);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  private routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        message: "Hello World with TypeScript!",
        timestamp: new Date().toISOString(),
      });
    });

    // Controller yang memakai next(error) tanpa handler ini akan membalas HTML,
    // padahal frontend selalu mem-parse JSON.
    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        console.error("Unhandled error:", error);

        res.status(error?.status || 500).json({
          status: error?.status || 500,
          message: error?.message || "Internal server error",
        });
      },
    );
  }
}

export default new App().app;
