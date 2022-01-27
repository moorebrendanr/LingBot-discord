# Discord Syntax Tree
This is an adaptation of André Eisenbach's jsSyntaxTree which runs as a Discord Bot in Node.js.

The bot responds to a simple command `/tree ...`, and constructs a tree based on the given bracket notation.
Example: `/tree [A [B c]]`

You are free to use the code and self-host the bot. Here are the steps to run the bot:

1. Install the correct node modules according to the package.json. If you use npm, then `npm i` should suffice.

2. Set environment variables BOT_TOKEN and CLIENT_ID containing your bot's token and client ID, respectively.

3. Register the slash commands by running `node register-commands.js`.

4. Run the bot by running `node index.js`.