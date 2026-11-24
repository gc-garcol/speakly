// Tech concept: Bayes' Theorem
// Source: https://gc-garcol.github.io/cafe-docs/content/math/bayes-theorem/bayes-theorem.html
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "bayes-theorem",
  name: "Bayes' Theorem",
  questions: [
    {
      part: 1,
      question: "What is Bayes' theorem?",
      sample: {
        point: "Bayes' theorem is a formula that tells you how to update a belief when new evidence arrives.",
        explanation:
          "You start with a prior, which is how likely something is before you see any evidence. Then you weigh it by how well the evidence fits, and you get the posterior, which is what you should believe now.",
        example:
          "For instance, if 10% of transactions are fraud, and a transaction comes from an unusual IP address, Bayes' theorem lets you calculate that the chance of fraud has jumped to about 64%.",
        link: "So in short, it's a simple way to turn \"what I thought before\" plus \"what I just saw\" into \"what I should think now\".",
      },
      peel: {
        point: { idea: "A one-sentence definition", vocab: ["update a belief", "new evidence"] },
        explanation: { idea: "Prior → evidence → posterior", vocab: ["prior", "weigh it by", "posterior"] },
        example: { idea: "The fraud example: 10% becomes 64%", vocab: ["For instance", "jumped to"] },
        link: { idea: "Summarise it in plain words", vocab: ["in short"] },
      },
    },
    {
      part: 2,
      question: "Explain how Bayes' theorem works, using a real example.",
      cues: [
        "what the hypothesis and the evidence are",
        "what numbers you need",
        "how you calculate the result",
        "and explain what the result tells you",
      ],
      sample: {
        point:
          "I'd like to explain Bayes' theorem with a medical test, because it's the classic example. The hypothesis is \"this person has the disease\", and the evidence is \"the test came back positive\".",
        explanation:
          "To use the formula, you need three numbers. First, the base rate, which is how common the disease is. Second, the hit rate, meaning how often the test is positive when someone really has the disease. And third, the false alarm rate, which is how often the test is positive for healthy people. The posterior is the people who have the disease and tested positive, divided by everyone who tested positive.",
        example:
          "Let's say only 1% of people have the disease, the test catches 90% of them, and it wrongly flags 9% of healthy people. If we imagine 1,000 people, 10 have the disease and 9 of them test positive. But out of the 990 healthy people, about 89 also test positive. So 98 people get a positive result, and only 9 of them are actually sick. That's roughly 9%, not 90% as most people would guess.",
        link:
          "What this tells us is that a strong test for a rare condition still produces mostly false alarms. That's why doctors usually ask for a second test, and personally, I find it a great reminder to always think about the base rate before jumping to conclusions.",
      },
      peel: {
        point: { idea: "Pick the example and name the hypothesis and evidence", vocab: ["The hypothesis is", "the evidence is"] },
        explanation: { idea: "The three numbers you need", vocab: ["base rate", "hit rate", "false alarm rate"] },
        example: { idea: "Count through 1,000 people", vocab: ["Let's say", "roughly 9%"] },
        link: { idea: "What the result teaches us", vocab: ["What this tells us", "mostly false alarms", "jumping to conclusions"] },
      },
    },
    {
      part: 3,
      question: "Why is Bayes' theorem useful?",
      sample: {
        point: "I think Bayes' theorem is useful mainly because it corrects one of the most common mistakes in reasoning, which is ignoring the base rate.",
        explanation:
          "People tend to confuse \"how likely the evidence is if the claim is true\" with \"how likely the claim is given the evidence\". They sound similar, but they're completely different questions, and Bayes' theorem is the bridge between them.",
        example:
          "A famous example is the prosecutor's fallacy. If a DNA profile matches one in a million people, it's tempting to say there's a one in a million chance the suspect is innocent. But in a city of ten million, about ten innocent people would match too, so the match alone only makes guilt about 9% likely.",
        link: "So it's not just a maths formula; it's a tool that helps people, from doctors to judges, make much fairer and more accurate decisions.",
      },
      peel: {
        point: { idea: "The main reasoning mistake it fixes", vocab: ["mistakes in reasoning", "ignoring the base rate"] },
        explanation: { idea: "The two questions people mix up", vocab: ["tend to confuse", "the bridge between"] },
        example: { idea: "The prosecutor's fallacy", vocab: ["fallacy", "tempting"] },
        link: { idea: "Who benefits from it", vocab: ["not just a maths formula", "more accurate decisions"] },
      },
    },
    {
      part: 3,
      question: "When should you use Bayes' theorem, and when should you be careful?",
      sample: {
        point: "You should use Bayes' theorem whenever you have a prior belief and new evidence that changes it, especially when the thing you're looking for is rare.",
        explanation:
          "It also works step by step: today's posterior becomes tomorrow's prior. However, the result is only as good as the inputs. If the base rate is wrong, or you treat two related pieces of evidence as independent, you'll get a confident but wrong answer.",
        example:
          "For example, a fraud system can combine several signals, like a new device, an unusual country and a large amount, and update the fraud probability with each one. But if two signals always appear together for the same reason, counting both would push the probability far too high.",
        link: "So my advice is to use it whenever evidence keeps arriving, but always double-check your base rate and make sure the evidence is genuinely independent.",
      },
      peel: {
        point: { idea: "When to use it", vocab: ["whenever", "especially when"] },
        explanation: { idea: "How it updates + the main risk", vocab: ["step by step", "only as good as", "independent"] },
        example: { idea: "A fraud system with several signals", vocab: ["combine several signals", "far too high"] },
        link: { idea: "Your advice", vocab: ["my advice is", "genuinely independent"] },
      },
    },
    {
      part: 3,
      question: "Where is Bayes' theorem used in the real world?",
      sample: {
        point: "Bayes' theorem is used in a surprising number of places, from email to medicine and machine learning.",
        explanation:
          "That's because any system that needs to update a probability as new data arrives can use the same idea.",
        example:
          "The best-known example is spam filters. Each word in an email nudges the probability of spam up or down, and naive Bayes was actually the first spam filter that worked at scale. It's also used in medical screening, in robotics to combine sensor readings, and in A/B testing to estimate the probability that version B beats version A.",
        link: "So even though the formula is just one line of algebra, it powers many of the systems we use every day.",
      },
      peel: {
        point: { idea: "Say it's used widely", vocab: ["a surprising number of"] },
        explanation: { idea: "Why it fits so many systems", vocab: ["That's because", "as new data arrives"] },
        example: { idea: "Spam filters, medicine, A/B testing", vocab: ["The best-known example", "nudges", "at scale", "estimate"] },
        link: { idea: "Simple formula, big impact", vocab: ["even though", "powers"] },
      },
    },
  ],
});
