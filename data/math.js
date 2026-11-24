// Topic: Maths (personal + what / why / when)
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "math",
  name: "Maths",
  questions: [
    {
      part: 1,
      question: "Did you enjoy maths at school?",
      sample: {
        point: "Yes, I really enjoyed maths at school, especially in secondary school.",
        explanation: "I liked the feeling of solving a difficult problem step by step, and the fact that there was always a clear right answer.",
        example: "For example, I used to stay after class with a few friends to work on extra geometry problems, and we even entered a local maths competition.",
        link: "So maths was definitely one of my favourite subjects, and it's probably one reason I became an engineer.",
      },
      peel: {
        point: { idea: "Yes or no, and when", vocab: ["really enjoyed", "secondary school"] },
        explanation: { idea: "What you liked about it", vocab: ["step by step", "a clear right answer"] },
        example: { idea: "A school memory", vocab: ["used to stay after class", "maths competition"] },
        link: { idea: "How it shaped you", vocab: ["one of my favourite subjects", "one reason I became"] },
      },
    },
    {
      part: 1,
      question: "Do you use maths in your daily life?",
      sample: {
        point: "Yes, I use maths every day, although usually without thinking about it.",
        explanation: "Simple calculations help me manage money and time, which are things everyone has to deal with.",
        example: "For instance, when I go shopping, I quickly compare prices per kilo, and I use percentages to work out how much I'm really saving during a sale.",
        link: "So even though I rarely use advanced formulas outside work, basic maths is part of almost every decision I make.",
      },
      peel: {
        point: { idea: "Yes or no, and how often", vocab: ["every day", "without thinking about it"] },
        explanation: { idea: "What it helps you manage", vocab: ["manage money and time", "deal with"] },
        example: { idea: "Shopping and sales", vocab: ["prices per kilo", "work out"] },
        link: { idea: "Its role in your decisions", vocab: ["even though", "almost every decision"] },
      },
    },
    {
      part: 2,
      question: "Describe a mathematical idea that you find useful.",
      cues: [
        "what the idea is",
        "when you first learned about it",
        "how it works",
        "and explain why you find it useful",
      ],
      sample: {
        point:
          "I'd like to talk about expected value, which is an idea from probability that I find surprisingly useful. I first learned about it at university in a statistics course, but I only really understood its value later, when I started working.",
        explanation:
          "Expected value is the average result you would get if you could repeat a decision many times. You multiply each possible outcome by its probability and add them all up. The reason it's so useful is that it helps you make decisions under uncertainty, instead of relying on gut feeling or focusing only on the best or worst case.",
        example:
          "A simple example is a lottery ticket. Let's say a ticket costs 10,000 dong, and there's a one in a million chance of winning 5 billion dong. The expected value of the prize is 5 billion divided by a million, which is only 5,000 dong, so on average you lose half of what you pay. I also use the same idea at work. For instance, when deciding whether to spend a week on a fix, I roughly estimate how likely a problem is and how much damage it would cause, and compare that with the cost of fixing it.",
        link:
          "Of course, expected value isn't everything, because people also care about risk; most of us wouldn't bet our house on a coin flip, even if the odds were slightly in our favour. But overall, it's a simple tool that helps me think more clearly, and I wish more people learned it at school.",
      },
      peel: {
        point: { idea: "What the idea is and when you learned it", vocab: ["expected value", "surprisingly useful", "at university"] },
        explanation: { idea: "How it works and why it helps", vocab: ["the average result", "multiply each possible outcome", "under uncertainty"] },
        example: { idea: "A lottery ticket + a decision at work", vocab: ["a lottery ticket", "one in a million", "on average"] },
        link: { idea: "One limitation + your overall opinion", vocab: ["isn't everything", "in our favour", "think more clearly"] },
      },
    },
    {
      part: 3,
      question: "Why do many students find maths difficult?",
      sample: {
        point: "I think many students find maths difficult mainly because each topic builds on the previous one.",
        explanation: "If a student misses one key idea, like fractions, everything that depends on it becomes confusing, and the gap keeps growing year after year.",
        example: "I've seen this with my younger cousin, who struggled with algebra not because algebra is hard, but because she had never really understood negative numbers.",
        link: "So I believe the solution is to spot those gaps early and fix them, rather than labelling students as \"bad at maths\".",
      },
      peel: {
        point: { idea: "The main reason", vocab: ["builds on the previous one"] },
        explanation: { idea: "What happens when a student misses something", vocab: ["one key idea", "the gap keeps growing"] },
        example: { idea: "Someone you know", vocab: ["struggled with", "negative numbers"] },
        link: { idea: "Your suggested solution", vocab: ["spot those gaps early", "bad at maths"] },
      },
    },
    {
      part: 3,
      question: "Is maths still important now that we have calculators and AI?",
      sample: {
        point: "Yes, I think maths is just as important as before, maybe even more.",
        explanation: "Calculators and AI can do the calculations for us, but we still need to understand what the numbers mean and whether an answer makes sense.",
        example: "For example, if an AI tool tells you that a loan costs 2% a month, you need basic maths to realise that's about 27% a year, which is very expensive.",
        link: "So the focus of maths education should shift from doing calculations by hand to reasoning and checking results, but maths itself is far from outdated.",
      },
      peel: {
        point: { idea: "Give a clear opinion", vocab: ["just as important as before", "even more"] },
        explanation: { idea: "What machines can and can't do for us", vocab: ["do the calculations for us", "makes sense"] },
        example: { idea: "A loan example", vocab: ["2% a month", "about 27% a year"] },
        link: { idea: "How maths teaching should change", vocab: ["should shift from", "far from outdated"] },
      },
    },
    {
      part: 3,
      question: "How can statistics be misleading in the media?",
      sample: {
        point: "Statistics can be very misleading in the media, mainly because numbers are often presented without enough context.",
        explanation: "Journalists want eye-catching headlines, so they tend to report relative changes instead of absolute ones, or use small or biased samples.",
        example: "For instance, a headline might say that a food \"doubles your risk\" of a disease, but if the risk goes from 1 in 10,000 to 2 in 10,000, the real danger is still tiny.",
        link: "That's why I think everyone should learn basic statistics, so they can ask the right questions before believing a dramatic headline.",
      },
      peel: {
        point: { idea: "The main problem", vocab: ["very misleading", "without enough context"] },
        explanation: { idea: "How the numbers get distorted", vocab: ["eye-catching headlines", "relative changes", "biased samples"] },
        example: { idea: "\"Doubles your risk\"", vocab: ["doubles your risk", "still tiny"] },
        link: { idea: "What people should do", vocab: ["basic statistics", "a dramatic headline"] },
      },
    },
  ],
});
