import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      max_tokens: 400,
      stream: true,
      prompt,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      // OpenAI API error handling
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      // General error handling
      console.error("An unexpected error occurred:", error);
      throw error;
    }
  }
}

// import { NextApiRequest, NextApiResponse } from 'next';

// const questions: string[] = [
//   "What's a hobby you've recently started?",
//   "If you could have dinner with any historical figure, who would it be?",
//   "What's a simple thing that makes you happy?",
//   "What's the most interesting place you've ever visited?",
//   "If you could learn any skill instantly, what would it be?",
//   "What's your favorite book and why?",
//   "If you could live in any fictional world, which one would you choose?",
//   "What's the best piece of advice you've ever received?",
//   "If you could travel anywhere in the world right now, where would you go?",
//   "What's a goal you're currently working towards?",
//   "What's your favorite childhood memory?",
//   "If you could have any superpower, what would it be and why?",
//   "What's the most interesting fact you know?",
//   "If you could meet your future self, what would you ask them?",
//   "What's a small act of kindness you've experienced recently?"
// ];

// interface SuggestionResponse {
//   suggestions: string;
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<SuggestionResponse | { error: string }>
// ) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     // Randomly select 3 unique questions
//     const selectedQuestions: string[] = [];
//     while (selectedQuestions.length < 3) {
//       const randomIndex = Math.floor(Math.random() * questions.length);
//       const question = questions[randomIndex];
//       if (!selectedQuestions.includes(question)) {
//         selectedQuestions.push(question);
//       }
//     }

//     // Join the questions with '||' separator
//     const suggestions = selectedQuestions.join('||');

//     res.status(200).json({ suggestions });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred while generating suggestions' });
//   }
// }
