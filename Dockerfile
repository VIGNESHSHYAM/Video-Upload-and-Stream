FROM ubuntu:focal

RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y nodejs ffmpeg && \
    apt-get clean

WORKDIR /home/app

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT [ "node", "server.js" ]
