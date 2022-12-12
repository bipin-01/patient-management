FROM node:16 AS build
WORKDIR /usr/src/app
COPY . .
#COPY package*.json yarn.lock ./
RUN yarn install 
RUN yarn build
#COPY . .
#RUN yarn build


# For production build

FROM node:16-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist  
COPY --from=build /usr/src/app/package*.json ./ 
COPY --from=build /usr/src/app/yarn.lock  ./ 
COPY --from=build /usr/src/app/node_modules ./node_modules

CMD [ "/bin/bash", "-c", "source /vault/secrets/okr && yarn start" ]
