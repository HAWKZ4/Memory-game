document.querySelector(".splash-screen span").onclick = () => {
  let yourName= prompt("What's your name ?");

  if(yourName === "" || yourName === null) {
    document.querySelector(".name span").innerHTML = "Unknown";
  }else {
    document.querySelector(".name span").innerHTML= yourName
  }

  document.querySelector(".splash-screen").remove();

  document.getElementById("start").play()
}

// Default variables
let duration = 1000;
let wrongTries = 0;
let right = 0;

let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

let orderArray = [...Array.from(blocks.keys())]


shuffle(orderArray);

// Set order for blocks
blocks.forEach((block,index) =>{

  // Add order for blocks
  block.style.order = orderArray[index];

  block.addEventListener("click" , function () {
    // Trigger flip function
    flip(block)

  })

})

// Flip function 
function flip(blockSelected) {

  // Add class is-flipped
  blockSelected.classList.add("is-flipped");

  // Get all flipped blocks
  let allFlippedBlocks = blocks.filter((flippedBlock) => flippedBlock.classList.contains("is-flipped"));
  if(allFlippedBlocks.length === 2) {

      // Add class stop to main container memory game
      blocksContainer.classList.add("stop");

      setTimeout(() => {
        
        blocksContainer.classList.remove("stop")
      },duration)

      // Check function
      check(allFlippedBlocks[0],allFlippedBlocks[1])
    
  }
  

}

// Check function
function check (firstBlock , secondBlock) {
  
  if(firstBlock.dataset.name === secondBlock.dataset.name) {

    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("is-match");
    secondBlock.classList.add("is-match");
    
    document.getElementById("positive").play()

    right++;

    if(right ===  10) {
      console.log("YOU WIN");
      let div=document.createElement("div");
      div.appendChild(document.createTextNode(`YOU WIN YEAH :) After : ${wrongTries} Tries `));
      div.style.position= "absolute";
      div.style.left= "0";
      div.style.top= "0";
      div.style.width= "100%";
      div.style.height= "100vh";
      div.style.fontSize= "150px";
      div.style.display= "flex";
      div.style.justifyContent= "center";
      div.style.alignItems= "center";
      div.style.color= "Green";
      div.style.color= "Green";
      div.style.fontWeight= "bold";

      blocksContainer.remove();
      document.querySelector(".info-container").remove()

      document.body.appendChild(div);
      
      return false;
    }

  }else {

    document.querySelector(".tries span").innerHTML = parseInt(document.querySelector(".tries span").innerHTML) + 1;
    wrongTries++;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");

    },duration)
    document.getElementById("negative").play()
  }
  


}



// Shuffle function
function shuffle (arr) {

  let current = arr.length,
      temp,
      random;

  while(current > 0) {

    // Generate random number
    random = Math.floor(Math.random() * current);

    // Decrease the current by one
    current--;

    // Save current in stash
    temp = arr[current]

    // Current element = value of random element
    arr[current] = arr[random];
    
    // Random element = value of current element
    arr[random] = temp;

    }

    return arr;

}

