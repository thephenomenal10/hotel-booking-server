import logger from "./logger";
import app from "./app";
import { mongodbConnection } from "./mongodb";

const port = process.env.PORT || 8080;
mongodbConnection().finally(() => {
  app.listen(port, () => {
    logger.info(`Server is up and running on port: ${port}`);
  });
});
