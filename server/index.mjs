import { createApp } from './app.mjs';

const port = Number(process.env.PORT ?? 8787);
const host = process.env.HOST ?? '0.0.0.0';
const app = createApp();

app.server.listen(port, host, () => {
  console.log(`ToffiPacks API listening on http://${host}:${port}`);
});

async function shutdown(signal) {
  console.log(`${signal}: shutting down ToffiPacks API`);
  await app.close();
  process.exit(0);
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));

