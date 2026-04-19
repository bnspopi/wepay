import type { Context } from 'hono';

export const chat = async (c: Context) => {
  try {
    const { messages } = await c.req.json();
    return c.json({ content: [{ type: 'text', text: 'AI response placeholder. Connect LLM_PROVIDER in production.' }] });
  } catch (error: any) {
    return c.json({ message: error.message }, 400);
  }
};
