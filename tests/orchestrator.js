import retry from "async-retry";
import database from "infra/database";

const waitForAllServices = async () => {
  const waitForWebServer = () => {
    const fetchStatusPage = async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) {
        throw Error();
      }
    };
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });
  };

  await waitForWebServer();
};

const clearDatabase = async () => {
  await database.query("drop schema public cascade; create schema public;");
};

const orchestrator = {
  waitForAllServices,
  clearDatabase,
};

export default orchestrator;
