let currentProblem = null;
let wrongAttempts = 0;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newProblem() {
  const topic = document.getElementById("topic").value;
  wrongAttempts = 0;

  if (topic === "x") currentProblem = generateSolveForX();
  if (topic === "percent") currentProblem = generatePercent();
  if (topic === "pemdas") currentProblem = generatePemdas();
  if (topic === "fractions") currentProblem = generateFraction();

  document.getElementById("problem").textContent = currentProblem.prompt;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("hint").textContent = "";
}

function checkAnswer() {
  if (!currentProblem) {
    newProblem();
    return;
  }

  const userAnswer = document.getElementById("answer").value.trim();

  if (Number(userAnswer) === currentProblem.answer) {
    document.getElementById("feedback").textContent = "Correct!";
    document.getElementById("hint").textContent = currentProblem.explanation;
  } else {
    wrongAttempts++;
    document.getElementById("feedback").textContent = "Not quite.";

    if (wrongAttempts === 1) {
      document.getElementById("hint").textContent = currentProblem.hint;
    } else {
      document.getElementById("hint").textContent = currentProblem.explanation;
    }
  }
}

function generateSolveForX() {
  const a = randomInt(2, 9);
  const x = randomInt(2, 12);
  const b = randomInt(1, 20);
  const c = a * x + b;

  return {
    prompt: `Solve for x: ${a}x + ${b} = ${c}`,
    answer: x,
    hint: `Start by subtracting ${b} from both sides.`,
    explanation: `Subtract ${b}: ${a}x = ${c - b}. Then divide by ${a}. x = ${x}.`
  };
}

function generatePercent() {
  const percent = randomInt(1, 9) * 10;
  const number = randomInt(5, 20) * 10;
  const answer = number * percent / 100;

  return {
    prompt: `What is ${percent}% of ${number}?`,
    answer: answer,
    hint: `Change ${percent}% into ${percent / 100}.`,
    explanation: `${percent}% of ${number} means ${percent / 100} × ${number} = ${answer}.`
  };
}

function generatePemdas() {
  const a = randomInt(2, 9);
  const b = randomInt(2, 9);
  const c = randomInt(2, 9);
  const answer = a + b * c;

  return {
    prompt: `Evaluate: ${a} + ${b} × ${c}`,
    answer: answer,
    hint: "Use multiplication before addition.",
    explanation: `First multiply: ${b} × ${c} = ${b * c}. Then add ${a}. Answer = ${answer}.`
  };
}

function generateFraction() {
  const denominator = randomInt(2, 9);
  const numerator1 = randomInt(1, denominator - 1);
  const numerator2 = randomInt(1, denominator - 1);
  const answer = numerator1 + numerator2;

  return {
    prompt: `Add: ${numerator1}/${denominator} + ${numerator2}/${denominator}. Enter the numerator only: ?/${denominator}`,
    answer: answer,
    hint: "The denominators are the same, so add the numerators.",
    explanation: `${numerator1}/${denominator} + ${numerator2}/${denominator} = ${answer}/${denominator}.`
  };
}

newProblem();
