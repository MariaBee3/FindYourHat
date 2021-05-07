const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.vertical = 0; 
    this.horizontal = 0; 

    this.gameOn = true; 
  }

static generateField(height, width, percentage) {
  let newField = []; 
  let holeNr = width * height * percentage; 
  
  //create field filled with only field characters
  for (let i = 0; i < height; i++) {
    newField.push([]); {for (let j = 0; j < width; j++) {
    newField[i].push(fieldCharacter); 
    }
  }
  }; 

//place hat in field
  newField[0][0] = pathCharacter; 
  let hatX = Math.floor(Math.random() * width);
  let hatY = Math.floor(Math.random() * height);
  newField[hatY][hatX] = hat; 

//place holes in field
  for (let i = 0; i < holeNr; i++) {
    let holeX = Math.floor(Math.random() * width); 
    let holeY = Math.floor(Math.random() * height); 
    newField[holeX][holeY] = hole; 

  while (holeX === 0 && holeY === 0 || hatX === holeX && hatY === holeY){
    let holeX = Math.floor(Math.random() * width); 
    let holeY = Math.floor(Math.random() * height); 
    newField[holeX][holeY] = hole; 
    }
  }

  return newField; 
}; 

//method to print the field with a * at the current location
  print() {
    this.field[this.vertical][this.horizontal] = pathCharacter; 
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join('')); 
    } 
  };

//method to check if the game should continue or if the person won or lost (in which case it won't continue)
  winCheck() {
    if (this.field[this.vertical][this.horizontal]=== hat) {
      this.gameOn = false;
      console.log('congratulations! You won!') 
    } else if (this.field[this.vertical][this.horizontal]=== hole) {
      this.gameOn = false; 
      console.log('Woeps, you fel in a hole. You lost.')
    } else if (this.vertical < 0 || this.horizontal < 0) {
      this.gameOn = false; 
      console.log('Out of bound. Try again');  
    } 
  }

//method to prompt user input and update the current location
  location(){
    let mov = prompt('Which way would you like to move?') 
    if (mov==='r'){
      this.horizontal+=1;  
    } else if (mov==='l'){
      this.horizontal-=1; 
    } else if (mov==='u'){
      this.vertical-=1; 
    } else if (mov==='d'){
      this.vertical+=1; 
    }
  }


//do while loop to print the field, ask user input+update location, check if the game should con
  gameLoop(){
    do {
      this.print(); 
      this.location(); 
      this.winCheck(); 
    } while (this.gameOn === true);
  }
};  

const testField = new Field(Field.generateField(5, 5, 0.2));

testField.gameLoop(); 
