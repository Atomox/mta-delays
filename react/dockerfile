# Dockerfile for a node container, to be included as part of a docker-compose
# file. This does not start the app on it's own, but sets up the environment,
# prepping to be run in the compose file.
FROM node:9.3.0-alpine

# Create a source directory
RUN mkdir -p /usr/src/react
WORKDIR /usr/src/react

# Copy Package.json FIRST, so we can cache the install step.
COPY ./package.json package.json
RUN npm install

# Now, bring over the code.
COPY . .

# RUN npm run build --production
RUN npm run build --production

# Expose the port, in case we're using Kubernetes
# instead of docker-compose.
EXPOSE 8101

# Run NPM start in the working directory to kick-off the node process.
# CMD ["npm", "start"]