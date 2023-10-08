const express=require("express");
const cors=require("cors");
require('dotenv').config();
const bodyParser=require("body-parser");
const {Configuration,OpenAIApi}=require("openai");
const config =new Configuration({
    apiKey:process.env.CHATGPT_API_KEY,
})
const openai =new OpenAIApi(config);

const app=express();
app.use(bodyParser.json());
app.use(cors());
let conversationHistory=[];
app.post("/reload",(req,res)=>{
    conversationHistory=[];
    console.log("Reloaded");
})
app.post("/chat",async(req,res)=>{
    const {prompt}=req.body
    console.log("Prompt",req.body);
    conversationHistory.push(prompt);
    const completion =await openai.createCompletion({
        model:"text-curie-001",
        max_tokens:512,
        temperature:0,
        stop:".\\n",
        prompt:prompt+"? ->",
    });
    conversationHistory.push(completion.data.choices[0].text);
    console.log("Answer ",completion.data.choices[0].text);
    console.log("Previous History",conversationHistory);
    res.send(completion.data.choices[0].text);
    
})

const port=8080;
app.listen(port,()=>{
    console.log('Server listening on port',port);
});

