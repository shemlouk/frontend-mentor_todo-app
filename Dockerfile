FROM oven/bun:latest

COPY package.json bun.lockb ./

RUN bun install

COPY . .

EXPOSE 3333

CMD ["bun", "start"]