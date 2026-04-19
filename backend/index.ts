import { serve } from '@hono/node-server';
import app from './app.ts';

const port = parseInt(process.env.PORT || '9000');

console.log(`WePay backend starting on port ${port}...`);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`✅ Server running at http://localhost:${info.port}`);
});

