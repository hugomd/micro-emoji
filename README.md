# Micro Emoji 🎉
A microservice for serving, listing and searching for emoji.

Emoji icons courtesy of [EmojiOne](http://emojione.com), a free and open source project.

# Usage
```
GET /:emojiName
GET /:emojiName/64
GET /:emojiName/128
GET /:emojiName/512

GET /list

GET /search/:emojiName [not implemented]
```

# Example
![Example GIF](http://hu.md/Rf0i/1JkszGQM.gif)

# Contributing
Clone the repo, `yarn install`, `yarn run dev`, change what you'd like and make a pull request ✌️

# Deploy
[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/hugomd/micro-emoji)

```
now hugomd/micro-emoji
```
