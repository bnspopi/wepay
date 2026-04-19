import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { errorHandler } from './middleware/error.ts';
import authRoutes from './routes/auth.routes.ts';
import welfareRoutes from './routes/welfare.routes.ts';
import credentialRoutes from './routes/credential.routes.ts';
import userRoutes from './routes/user.routes.ts';
import aiRoutes from './routes/ai.routes.ts';
import transactionRoutes from './routes/transaction.routes.ts';
import walletRoutes from './routes/wallet.routes.ts';

const app = new Hono();

app.use(cors());

app.get('/', c => c.text('WePay Server is up and running'));
app.get('/health', c => c.text('OK'));

app.route('/auth', authRoutes);
app.route('/welfare', welfareRoutes);
app.route('/credentials', credentialRoutes);
app.route('/users', userRoutes);
app.route('/ai', aiRoutes);
app.route('/transactions', transactionRoutes);
app.route('/wallet', walletRoutes);

app.get('/schemes', c => c.redirect('/welfare/schemes'));
app.get('/schemes/:id', c => c.redirect(`/welfare/schemes/${c.req.param('id')}`));

app.notFound(c => c.json({ message: 'Not found' }, 404));
app.onError((err, c) => errorHandler(err, c));

export default app;

