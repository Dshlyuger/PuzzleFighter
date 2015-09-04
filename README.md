# PuzzleFighter

This project implements the popular game boy advance game Puzzle Fighter. It includes a multiplayer mode, powered by socket.io, 
where if a player is accessing the game at the same time as you are you'll be matched up against them(you can simulate this by running two instances of the game in different tabs) and an AI mode where you play against a very basic AI.
The game is currently hosted at http://puzzleroyalealpha.herokuapp.com/ but it's setup so that you can just run index.html after cloning this repo and play utilizing the server.

I built the game as a way to learn the fundamentals of javascript so there's no jquery involved and quite a bit of janky stuff going on but it was a good learning experience.

<b>TODO  </b>  <br />
1) Rename images folder to Game without breaking the heroku deploy(strange bug)  <br /> <br />
2) Come up with a better way of implementing the AI, which now utilizes an iframe hack which simulates another player logging on. <br />   <br />
3) Refactor the code with ES6, make it module based so index.html isn't so monolithic, utilize higher order functions, utilize jquery where it's optimal 
and reduce the amount of code in general. <br /> <br />
4) Improve the AI by implementing Alpha-Beta Pruning in javascript and come up with a better estimator function.
