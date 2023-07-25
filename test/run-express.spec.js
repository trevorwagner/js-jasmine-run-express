import express from "express";
import http from "http";
import axios from "axios";

const SUCCESS_MESSAGE = "This is what it looks like when it works.";

describe("When Express is run in test runtime", () => {
  const app = express();
  let server;

  app.get("/success", (req, res) => {
    res.send(SUCCESS_MESSAGE);
  });

  beforeAll(() => {
    server = http.createServer(app);
    server.listen(3000, () => {
      console.log(`Express now listening on port 3000.`);
    });
  });

  afterAll(() => {
    server.close();
  });

  describe(`a request submitted /success during test runtime`, () => {
    let response;

    beforeAll(async () => {
      response = await axios.get(`http://localhost:3000/success`);
    });
    it("returns an HTTP response code of 200", () => {
      expect(response.status).toEqual(200);
    });
    it(`returns the text "${SUCCESS_MESSAGE}" in the response body`, () => {
      expect(response.data).toEqual(SUCCESS_MESSAGE);
    });
  });
});
