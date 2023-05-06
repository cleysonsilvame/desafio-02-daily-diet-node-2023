FROM node:18-slim

WORKDIR /home/node/app

RUN apt update
RUN apt install curl -y
RUN curl -fsSL https://get.pnpm.io/install.sh | bash -

CMD ["tail", "-f", "/dev/null"]