# 🏰 Welcome to Quizendoor!

Your fun medieval quiz game where knowledge meets adventure.

[👉 Play Now](https://quizendoor.web.app/) | [🐛 Report Bugs](https://github.com/yourusername/quizendoor/issues)

## 🎮 What's This Game About?

You're a brave hero on a quest to become the smartest in the kingdom! Answer questions, collect power-ups, and have fun while learning new things.

## 📸 Peek Inside the Castle

Behold, brave adventurer! Here's what awaits you in Quizendoor:

### 🏰 The Royal Welcome

![Home Screen](./screenshots/home.png)
_Welcome to the grand castle of knowledge_

### 📜 Ancient Scrolls of Wisdom

![Rules Screen](./screenshots/rules.png)
_Study the sacred rules before your quest begins_

### ⚔️ The Challenge Begins

![Quiz Question](./screenshots/quiz1.png)
_Face the mysteries of the realm_

### 🎯 Moment of Truth

![Answer Selection](./screenshots/quiz2.png)
_Choose wisely, for your fate hangs in the balance_

### 📚 Wisdom Revealed

![Question Explanation](./screenshots/explain.png)
_Learn from the ancient scribes' explanations_

### 🏆 Journey's End

![High Score](./screenshots/result-high.png)
_Glory awaits the wisest of champions (90%+ score)_

![Medium Score](./screenshots/result-mid.png)
_A valiant effort worthy of praise (70-90% score)_

![Low Score](./screenshots/result-low.png)
_Keep training, young apprentice (Below 70% score)_

### 💔 The Fall

![Defeat Screen](./screenshots/defeat.png)
_When all lives are lost, but heroes never truly fail_

## ✨ Cool Stuff You Can Do

- 💖 You get 3 lives to start
- 🔥 Answer questions in a row for bonus points
- 🎁 Find helpful items like:
  - ⏳ Time Boost
  - ⚡ Question Skipper
  - 💫 Point Doubler
- 📈 Score big points with correct streaks
- 🎵 Fun sounds and effects
- 📚 Learn from mistakes with easy-to-read explanations

## 🛠️ How We Built It

### 👑 Main Parts

- ⚛️ React - Makes everything work
- ⚡ Vite - Makes it super fast
- 🎨 TailwindCSS - Makes it look pretty
- 🎵 Howler.js - Adds cool sounds
- ✨ React-Confetti - For celebrations

### 🔧 Behind the Scenes

- 📡 Express & Node - Powers the game
- 🤖 TypeScript - Keeps code clean
- 🎯 ESLint & Prettier - Makes code neat

## 🚀 Want to Try It Locally?

1. Clone the repository:

```sh
git clone <repository-url>
cd quizendoor
```

2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
# Terminal 1 - Start the proxy server
node server.js

# Terminal 2 - Start the Vite dev server
npm run dev
```

4. Access the application at `http://localhost:5173`

## 💻 What You Need

- A computer with Node.js
- Some basic coding knowledge
- A modern web browser

## 🎨 Make It Your Own

Want to add your own questions? It's easy!

1. Set up your own JSON endpoint
2. Update the API URL in `server.js`
3. Ensure questions follow the required format:

```json
{
  "questions": [
    {
      "question": "Your fun question here",
      "answers": ["Right answer", "Wrong answer"],
      "correct": 0,
      "explanation": "Why this is right!"
    }
  ]
}
```

## 🔊 Game Sounds

Drop these sound files in `public/sounds`:

- 🎵 correct.mp3
- 🎵 wrong.mp3
- 🎵 powerup.mp3
- 🎵 timer.mp3
- 🎵 victory.mp3
- 🎵 start.mp3

## 👋 Want to Help?

We love new friends! You can:

- 🔍 Find bugs
- 💡 Share ideas
- 🎨 Make it better

## 📜 The Boring (But Important) Stuff

This game is free to use under the MIT License!

## 🌟 Thanks To

- 🎨 Medieval font: MedievalSharp
- 🎵 Sound effects from Youtube
- 🗡️ Icons and emojis for the fantasy theme

---

Made with ❤️ and a sprinkle of magic dust ✨
