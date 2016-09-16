class ShowMan {
  placeCar() {
    this.doors = [0,0,0];
    let randomIndex = Math.floor(Math.random() * 3);
    this.doors[randomIndex] = 1;
    //console.log('showMan putted car ' +  this.doors);
  }
  
  suggest(index) {
    for (let i = 0; i < 3; i++) {
      if (index !== i && !this.doors[i]) {
        //console.log('Show Man get choice ' + index + ' while doors=' + this.doors + ' and suggested not to choose ' + i);
        return i;
      }
    }
  }
  
  testChoice(index) {
    let result = this.doors[index] === 1;
    //console.log('Show Man get answer ' + index + ' to check while doors= ' + this.doors + ' and returned ' + result);
    return result;
  }
}

class Player {
  constructor(isSmart) {
    this.isSmart = isSmart;
  }
  
  makeChoice() {
    this.choice = Math.floor(Math.random() * 3);
    //console.log('Player with isSmart=' + this.isSmart + ' made choice ' + this.choice);
    return this.choice;
  }
  
  makeFinalChoice(notSuggestedIndex) {
    let firstChoice = this.choice;
    if (this.isSmart) { 
      this.choice = 3 - (notSuggestedIndex + this.choice);
    } 
    //console.log('Player with isSmart=' + this.isSmart + ' made final choice ' + this.choice + ' (first choie was ' + firstChoice + ')');
    return this.choice;
  }
}

let showMan = new ShowMan();
let playerSmart = new Player(true);
let playerStupid = new Player(false);

let winCountSmart = 0;
let winCountStupid = 0;

for (let i = 0; i < 100; i++) {
  showMan.placeCar();
  winCountSmart += +showMan.testChoice(playerSmart.makeFinalChoice(showMan.suggest(playerSmart.makeChoice())));
  winCountStupid += +showMan.testChoice(playerStupid.makeFinalChoice(showMan.suggest(playerStupid.makeChoice())));
}

console.log('Smart vs Stupid: ' + winCountSmart + ' vs '+ winCountStupid + ', ration is ' + winCountSmart/winCountStupid);
