# Connect Four
#### Go Nuts 4 Donuts
http://hizegi.github.io/ConnectFour

## Description

Go Nuts 4 Donuts is a fun two-player Connect Four game, where players take turns to get 4 donuts in a row first.

## Tech Used
- Javascript
- CSS
- HTML

## Features

####Instructions Panel
-Instructions easily spell out gameplay for Connect Four novices

####Enter Player Names for two people
- Names get stored if player decides to play again
- Names can be re-entered if player decides to quit current game

####Messages
- Message screen guides the player throughout the game.
- Announces player turn
- Announces Winner
- Announces Draw

####Randomizer to randomize who goes first
- 50% chance for either player to go first
- After each round, randomizer fires to allow for a chance for different player to start

####Winning donuts blink
- Winning combos blink after victory

####Draw function
- In the event of no winner and all slots are played, Draw is announced

####Replay option
- After a round, player can choose to play again with the same opponent
- After a draw, player is presented with the same option

## Strategies

- Literally mapped out a 6 X 7 board with corresponding array indices to understand the location of each "donut"
- Using these indicies I was able to write winning conditions with double for-loops. I made several physical copies of these maps to map out winning conditions vertically, horizontally, positive diagonally, and negative diagonally.

## Future Improvements

####Responsive Design
- Currently the divs are set to specific pixel widths
- The message divs are responsive to width

####Customizable Dimensions
- I wanted to implement options to manually enter the amount of columns and rows. With the exception of one line of code (JS: 225), the rest of the code is written for scalability to allow for various numbers of columns and rows. The challenge in this would be to: 

1. Implement input screen for player to enter in desired number of Columns + Rows
2. Re-stylize CSS to account for div widths as % to allow for responsive design
3. Double check win-conditions 

####Improved Winning Conditions
- Winning conditions were not DRY. Wanted to pick apart the mathematics in the conditions to find the most efficient function that would check all 8 directions for a donut.

####Super bonus: AI 
- Once I have a good winning condition function, I would like to have an AI be smart enough to "block" a potential 4-in-a-row, and also to try to effectively get 4-in-a-row.

##Usage

- Donut graphics were created by me on Adobe Illustrator
- Wallpaper image was provided by Home Depot http://www.homedepot.com
- CheckDraw() function was derived from colleague Vincent, which I implemented into my own project

