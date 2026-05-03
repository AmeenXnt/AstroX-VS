FROM node:lts-slim

# 1. Set the working directory
WORKDIR /app

RUN apt-get update && \
  apt-get install -y \
  git \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

# 2. Copy package files and install dependencies in the WORKDIR
COPY package.json .

RUN npm install

# 3. Copy the rest of the application files
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
