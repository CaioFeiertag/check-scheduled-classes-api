# base image
FROM node:16.19.0

# set working directory
WORKDIR /app

# copy .env.example to .env
COPY .env.example .env

# copy files
COPY . .

# install packages
RUN yarn

# build app
RUN yarn build

CMD ["yarn", "start"]