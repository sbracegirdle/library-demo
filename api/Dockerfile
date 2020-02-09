FROM node:10

# Depriv
USER node
WORKDIR /home/node

# Install dependencies
COPY package.json /home/node/
COPY package-lock.json /home/node/
RUN npm install --only=production

# Copy rest of app
COPY dist/ /home/node/dist/

EXPOSE 3001
CMD ["node", "dist/index.js"]