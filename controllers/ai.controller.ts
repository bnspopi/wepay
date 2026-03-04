import { Context } from 'hono';
import { Llm, LlmProvider } from '@uptiqai/integrations-sdk';
import catchAsync from '../utils/catchAsync.ts';

export const chat = catchAsync(async (c: Context) => {
  const { messages } = await c.req.json();
  
  const llm = new Llm({ 
    provider: process.env.LLM_PROVIDER as LlmProvider 
  });

  const response = await llm.generateText({
    messages,
    model: process.env.LLM_MODEL
  });

  return c.json(response);
});
