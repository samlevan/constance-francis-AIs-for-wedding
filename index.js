import { SCENARIO_1, SCENARIO_2 } from './src/scenarios.js';

const SCENARIO = SCENARIO_2

import chalk from 'chalk';
import AI_person from './src/ai_person.js';
import get_francis_persona from './src/francis.js';
import get_constance_persona from './src/constance.js';

const francis_persona = await get_francis_persona(SCENARIO)
// console.log(francis_persona)
const AI_francis = new AI_person(francis_persona);

const constance_persona = await get_constance_persona(SCENARIO)
// console.log(constance_persona)
const AI_constance = new AI_person(constance_persona)

console.log(chalk.blue(SCENARIO.first_prompt_from_francis + '\n\n'))

const continue_chat = async (who_is_speaking, prompt) => {
  let new_prompt
  if (who_is_speaking == 'Francis') {
    console.log('Francis listening...')
    new_prompt = await AI_francis.chat(prompt)
  }
  else if (who_is_speaking == 'Constance') {
    console.log('Constance listening...')
    new_prompt = await AI_constance.chat(prompt)
  }
  continue_chat(who_is_speaking === 'Francis' ? 'Constance' : 'Francis', new_prompt)
}

continue_chat('Constance', SCENARIO.first_prompt_from_francis)
