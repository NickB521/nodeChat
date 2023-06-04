const { Configuration, OpenAIApi } = require("openai");
const readline = require("readline");
rl = readline.createInterface(process.stdin, process.stdout);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

console.log(
  "We are here today to build a short description of someone like YOU!!!!"
);
console.log(" ")
//asking questions
const fullthang = () => {
  rl.question("What is one of your favorite activities?: ", (input1) => {
    const activity = input1;
    console.log(" ")
    //asking questions
    rl.question(
      "How would u describe yourself in one word?: ",
      (input2) => {
        const traits = input2;
        console.log(" ")
        //asking questions
        rl.question("Where do you live?: ", (input3) => {
          const placeOfLiving = input3;
          console.log(" ")
          rl.question("And finally whats your name: ", (input4) => {
            const name = input4;
            rl.close();
            console.log(
              "Please allow a few moments to put together a description..."
            );
            console.log(" ");
            const go = async () => {
              const completion = await openai.createCompletion({
                //the type of chat gpt
                model: "text-davinci-003",
                //passing the input into the prompt so the openAi
                //can read the input
                prompt:
                  "Write me on a description on someone named " +
                  name +
                  " who enjoys " +
                  activity +
                  " and would describe themselve as " +
                  traits +
                  ". who lives in" +
                  placeOfLiving +
                  ". Keep it under 100 words",
                temperature: .8,
                max_tokens: 350,
              });
              //digs into the object called data, then choices
              //and at the first array spot u get the text property
              const aiResponse = completion.data.choices[0].text;
              console.log(aiResponse);
              console.log(" ")
              return aiResponse;
              //console.log(completion.data)
            };
            go();
          });
        });
      }
    );
  });
};
fullthang();
module.exports = {
  fullthang,
};
