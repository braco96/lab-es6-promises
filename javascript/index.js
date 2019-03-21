// This will print in the wrong order.
// We added it as an example and to test that the arrays from data.js are loaded

// 🚨🚨🚨 Comment out the below code before you start working on the code

// Out of sync
  getInstruction("mashedPotatoes", 0, (step1) => {
    document.querySelector("#mashedPotatoes").innerHTML += `<li>${step1}</li>`;
  }, (error) => console.log(error));
  
  getInstruction("mashedPotatoes", 1, (step2) => {
    document.querySelector("#mashedPotatoes").innerHTML += `<li>${step2}</li>`;
  }, (error) => console.log(error));
  
  getInstruction("mashedPotatoes", 2, (step3) => {
    document.querySelector("#mashedPotatoes").innerHTML += `<li>${step3}</li>`;
  }, (error) => console.log(error));
  
  getInstruction("mashedPotatoes", 3, (step4) => {
    document.querySelector("#mashedPotatoes").innerHTML += `<li>${step4}</li>`;
  }, (error) => console.log(error));
  
  getInstruction("mashedPotatoes", 4, (step5) => {
    document.querySelector("#mashedPotatoes").innerHTML += `<li>${step5}</li>`;
    document.querySelector("#mashedPotatoesImg").removeAttribute("hidden");
  }, (error) => console.log(error));
/*
// Out of sync example to show asynchronous behavior without proper sequencing
getInstruction("mashedPotatoes", 0, (step1) => {
  document.querySelector("#mashedPotatoes").innerHTML += `<li>${step1}</li>`;
}, (error) => console.log(error));

getInstruction("mashedPotatoes", 1, (step2) => {
  document.querySelector("#mashedPotatoes").innerHTML += `<li>${step2}</li>`;
}, (error) => console.log(error));

getInstruction("mashedPotatoes", 2, (step3) => {
  document.querySelector("#mashedPotatoes").innerHTML += `<li>${step3}</li>`;
}, (error) => console.log(error));

getInstruction("mashedPotatoes", 3, (step4) => {
  document.querySelector("#mashedPotatoes").innerHTML += `<li>${step4}</li>`;
}, (error) => console.log(error));

getInstruction("mashedPotatoes", 4, (step5) => {
  document.querySelector("#mashedPotatoes").innerHTML += `<li>${step5}</li>`;
  document.querySelector("#mashedPotatoesImg").removeAttribute("hidden");
}, (error) => console.log(error));
*/



// Iteration 1 - using callbacks
// ...
// We nest callbacks so each step waits for the previous one before executing
getInstruction('mashedPotatoes', 0, (step0) => {
  document.querySelector('#mashedPotatoes').innerHTML += `<li>${step0}</li>`; // add step 0
  getInstruction('mashedPotatoes', 1, (step1) => {
    document.querySelector('#mashedPotatoes').innerHTML += `<li>${step1}</li>`; // add step 1
    getInstruction('mashedPotatoes', 2, (step2) => {
      document.querySelector('#mashedPotatoes').innerHTML += `<li>${step2}</li>`; // add step 2
      getInstruction('mashedPotatoes', 3, (step3) => {
        document.querySelector('#mashedPotatoes').innerHTML += `<li>${step3}</li>`; // add step 3
        getInstruction('mashedPotatoes', 4, (step4) => {
          document.querySelector('#mashedPotatoes').innerHTML += `<li>${step4}</li>`; // add step 4
          document.querySelector('#mashedPotatoes').innerHTML += `<li>Mashed potatoes are ready!</li>`; // final message
          document.querySelector('#mashedPotatoesImg').removeAttribute('hidden'); // reveal image when done
        }, (err) => console.log(err)); // handle errors for step 4
      }, (err) => console.log(err)); // handle errors for step 3
    }, (err) => console.log(err)); // handle errors for step 2
  }, (err) => console.log(err)); // handle errors for step 1
}, (err) => console.log(err)); // handle errors for step 0


// Iteration 2 - using promises
// ...
// Chain promises returned by obtainInstruction to keep the correct order
obtainInstruction('steak', 0)
  .then((step0) => {
    document.querySelector('#steak').innerHTML += `<li>${step0}</li>`; // add step 0
    return obtainInstruction('steak', 1); // request next step
  })
  .then((step1) => {
    document.querySelector('#steak').innerHTML += `<li>${step1}</li>`; // add step 1
    return obtainInstruction('steak', 2);
  })
  .then((step2) => {
    document.querySelector('#steak').innerHTML += `<li>${step2}</li>`; // add step 2
    return obtainInstruction('steak', 3);
  })
  .then((step3) => {
    document.querySelector('#steak').innerHTML += `<li>${step3}</li>`; // add step 3
    return obtainInstruction('steak', 4);
  })
  .then((step4) => {
    document.querySelector('#steak').innerHTML += `<li>${step4}</li>`; // add step 4
    return obtainInstruction('steak', 5);
  })
  .then((step5) => {
    document.querySelector('#steak').innerHTML += `<li>${step5}</li>`; // add step 5
    return obtainInstruction('steak', 6);
  })
  .then((step6) => {
    document.querySelector('#steak').innerHTML += `<li>${step6}</li>`; // add step 6
    return obtainInstruction('steak', 7);
  })
  .then((step7) => {
    document.querySelector('#steak').innerHTML += `<li>${step7}</li>`; // add step 7
    document.querySelector('#steak').innerHTML += `<li>Steak is ready!</li>`; // final message
    document.querySelector('#steakImg').removeAttribute('hidden'); // reveal image
  })
  .catch((err) => console.log(err)); // log any error in the chain


// Iteration 3 using async/await
// ...
// Use async/await to handle each step of the broccoli preparation sequentially
async function makeBroccoli() {
  try {
    for (let i = 0; i < broccoli.length; i++) {
      const step = await obtainInstruction('broccoli', i); // wait for each instruction
      document.querySelector('#broccoli').innerHTML += `<li>${step}</li>`; // add current step
    }
    document.querySelector('#broccoli').innerHTML += `<li>Broccoli is ready!</li>`; // final message after loop
    document.querySelector('#broccoliImg').removeAttribute('hidden'); // show image when done
  } catch (err) {
    console.log(err); // handle any error that occurs during the process
  }
}

makeBroccoli(); // invoke the async function to start the process


// Bonus 2 - Promise all
// ...
// Prepare brussels sprouts by starting all step promises at once and handling them together
const brusselsPromises = brusselsSprouts.map((_, index) => obtainInstruction('brusselsSprouts', index)); // create array of promises

Promise.all(brusselsPromises)
  .then((steps) => {
    steps.forEach((step) => {
      document.querySelector('#brusselsSprouts').innerHTML += `<li>${step}</li>`; // add each resolved step in order
    });
    document.querySelector('#brusselsSprouts').innerHTML += `<li>Brussels sprouts are ready!</li>`; // final message
    document.querySelector('#brusselsSproutsImg').removeAttribute('hidden'); // reveal image when done
  })
  .catch((err) => console.log(err)); // log any error from Promise.all