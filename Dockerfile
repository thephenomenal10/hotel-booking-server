# Step 1: Use Node.js base image
FROM node:20-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Step 4: Install dependencies
RUN yarn install --frozen-lockfile

# Step 5: Copy the application code
COPY . .

# Step 6: Compile TypeScript (if applicable)
RUN yarn build

# Step 7: Expose the application port
EXPOSE 3000

# Step 8: Start the application
CMD ["yarn", "start"]