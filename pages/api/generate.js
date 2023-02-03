import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`These are the entry points of a smart contract. Analyse them accordingly. Dont change the names of the entrypoints and analyse all the entrypoints. Ignore any function selectors if present while analysing.`
const generateAction = async (req, res) => {
 
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.65,
    max_tokens: 512,
  });
  // console.log(req.body.userInput);
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  const secondPrompt =
  `Prompt: ${basePromptOutput.text}
  Take the above analysis and create a comprehensive deep-dive of the contract.
  Follow the below template for the report:
  1. Introduction 
  2. Entry Point name and its analysis under it
  
  Make sure the report doesnot exceeds 300 words, is atleast 200 words and makes sense and there are no unrequired words or sentences and Introduction contains a brief description of the entrypoints, nothing else.`

  const secondCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    temperature: 0.85,
    max_tokens: 2000,
  });

  const secondPromptOutput = secondCompletion.data.choices.pop();
  res.status(200).json({ output: secondPromptOutput });
};


export default generateAction;