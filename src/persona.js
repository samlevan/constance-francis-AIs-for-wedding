const get_persona = params => {
    return {
      name: params.name,
      intentions: params.intentions,
      ai_setup_message: `Your name is ${params.name}.\n\n${params.background}\n\n${params.personality}\n\n${params.situation}\n\nYou are having a chat with ${params.other_person}.\n\n${params.intentions}`,
      system_instructions_before_each_prompt: params.system_instructions_before_each_prompt,
      color: params.color
    }
};

export default get_persona;
