import 'server-only'
import {
    createAI,
    getMutableAIState,
    streamUI,
    createStreamableValue
  } from 'ai/rsc';

import { openai } from '@ai-sdk/openai';

import {Message} from "@/lib/types";

import { nanoid } from '@/lib/utils';

import BotMessage from '@/components/chat-component/botmessage';

import { auth, clerkClient } from "@clerk/nextjs/server";

import { UploadThingError } from "uploadthing/server";

  export type AIState = {
    chatId: string
    messages: Message[]
  }

  export type UIState = {
    id: string
    role: 'user' | 'assistant'
    display: React.ReactNode
  }

  type Actions = {
    submitUserMessage: (content: string) => Promise<UIState>;
  };


  async function submitUserMessage(content: string)  : Promise<UIState>{
    'use server'

    //TO DO: HOW TO CACHE clerkClient.users.getUser
    const user = auth();
    if (!user.userId){
      return {
        id: nanoid(),
        role: 'assistant',
        display: <BotMessage content="You must login to chat with Bot." />
      }
    }
    const fullUserData = await clerkClient.users.getUser(user.userId);

    if (fullUserData?.privateMetadata?.["can-chat"] !== true){
      return {
        id: nanoid(),
        role: 'assistant',
        display: <BotMessage content="Only users who have permission can chat with the bot now. Future support for self-provided key will be supported." />
      }
    }

    const aiState = getMutableAIState<AIType>()
    aiState.update({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: 'user',
          content
        }
      ]
    })
      
    let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
    let textNode: undefined | React.ReactNode

    const result = await streamUI({
      model: openai('gpt-3.5-turbo'),
      initial: "",
      system: ``,
      messages: [
        ...aiState.get().messages.map((message: Message) => ({
          role: message.role,
          content: message.content,
        }))
      ] as Message[],
      text: ({ content, done, delta }) => {
        if (!textStream) {
          textStream = createStreamableValue('')
          textNode = <BotMessage content={textStream.value} />
        }
  
        if (done) {
          textStream.done()
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content
              }
            ]
          })
        } else {
          textStream.update(delta)
        }
        return textNode
      }
  })

  return {
    id: nanoid(),
    role: 'assistant',
    display: result.value
  }
}

  export const AI = createAI<AIState, UIState[], Actions>({
    actions: {
      submitUserMessage
    },
    initialUIState: [],
    initialAIState: { chatId: nanoid(), messages: [] },
  })


  export type AIType = typeof AI; 



