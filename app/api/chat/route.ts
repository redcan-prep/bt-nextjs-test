// import { Configuration, OpenAIApi } from 'openai-edge'
// import { OpenAIStream, StreamingTextResponse } from 'ai/stream'

// Create an OpenAI API client
// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY
// })
// const openai = new OpenAIApi(config)

// export async function POST(req: Request) {
//   const { messages } = await req.json()

//   const response = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     stream: true,
//     messages: messages.map((message: any) => ({
//       content: message.content,
//       role: message.role,
//     })),
//   })

//   const stream = OpenAIStream(response)
//   return new StreamingTextResponse(stream)
// }

export async function POST(req: Request) {
  const { messages } = await req.json()
  console.log(messages)
  return new Response("Hello World")
}