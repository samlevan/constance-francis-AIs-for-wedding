import OpenAI from 'openai';
import chalk from 'chalk';
import { question } from 'readline-sync';

const openai = new OpenAI({apiKey: process.env["OPENAI_API_KEY"]});

export default class AI_person {
  constructor(params) {
    this.name = params.name;
    this.intentions = params.intentions
    this.messages = [
      {
          "role": "system",
          "content": params.ai_setup_message
        }
    ]
    this.system_instructions_before_each_prompt = params.system_instructions_before_each_prompt
    this.color = chalk[params.color]
  }

  async chat(prompt) {
    const that = this
    const system_instructions = {
      "role": "system",
      "content": (Math.random() <= 0.3 ? that.intentions + '\n\n' : '') + that.system_instructions_before_each_prompt
    }
    const new_prompt = {
          "role": "user",
          "content": prompt
        }    
    this.messages = this.messages.concat([system_instructions, new_prompt])    
    // console.log(this.messages)
    const response = await openai.chat.completions.create({
      // model: "gpt-4",
      model: 'gpt-3.5-turbo',
      messages: that.messages,
      temperature: 1.5,
      max_tokens: 120,
      top_p: 1,
      frequency_penalty: 2,
      presence_penalty: 1
    });

    this.messages = this.messages.concat([
      {
        "role": "assistant",
        "content": response.choices[0].message.content
      }
    ])    

    // console.log(this.messages)
    // console.log(this.name)
    // console.log(response.choices)
    
    question(` `); // pause the chat and wait for "enter"
    console.log(this.color(this.name + ': ' + response.choices[0].message.content + '\n\n'))

    return response.choices[0].message.content;
  }
}


