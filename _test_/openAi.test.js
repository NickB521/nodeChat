const { default: axios } = require("axios");
const { fullthang } = require("../src/index.js");
jest.mock("axios");
jest.mock(
  "../data/api-keys.json",
  () => ({
    openAi: "abc-def-123-456",
    //according to the bot:
    //sets this as a virtual module
    //aka a fake module for testing
  }),
  { virtual: true }
);

const sampleResponse = {
  data: {
    choices: [
      {
        text: "\n\nI like turtles",
      },
    ],
  },
};

test("get choices from Ai", () => {
    const expected = undefined;

    axios.get.mockImplementation(() => Promise.resolve(sampleResponse));
    const botResponse = fullthang();
    expect(botResponse).toEqual(expected)
})
