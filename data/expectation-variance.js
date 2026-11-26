// Tech concept: Expectation, Variance and Covariance
// Source: https://gc-garcol.github.io/cafe-docs/content/quant/expectation-variance/expectation-variance.html
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "expectation-variance",
  name: "Expectation & Variance",
  questions: [
    {
      part: 1,
      question: "What is the expectation of a random variable?",
      sample: {
        point: "The expectation is basically the long-run average outcome of a random variable.",
        explanation:
          "You take every possible outcome and weight it by its probability, then add them all up. It doesn't have to be a value you can actually get.",
        example:
          "For instance, the expectation of a fair die is 3.5, even though you can never roll a 3.5. With daily stock returns, it's the drift you'd earn per day on average.",
        link: "So it tells you where things land on average if you repeat the experiment many times.",
      },
      peel: {
        point: { idea: "Define it as the long-run average", vocab: ["long-run average"] },
        explanation: { idea: "Weight each outcome by its probability", vocab: ["weight it by its probability", "add them all up"] },
        example: { idea: "The die gives 3.5; returns give the drift", vocab: ["For instance", "fair die", "drift"] },
        link: { idea: "What it means after many repeats", vocab: ["on average", "repeat the experiment"] },
      },
    },
    {
      part: 1,
      question: "What is variance, and how is it different from standard deviation?",
      sample: {
        point: "Variance measures how far the outcomes spread around the mean, and the standard deviation is just its square root.",
        explanation:
          "Variance is the expected squared distance from the mean, so its unit is squared. Taking the square root brings it back to the same unit as the data, which makes it much easier to interpret.",
        example:
          "For example, in finance the standard deviation of returns is called volatility, so a stock with a daily volatility of 2% typically moves about 2% a day.",
        link: "That's why people usually talk about standard deviation, even though variance is what you calculate first.",
      },
      peel: {
        point: { idea: "Spread around the mean; σ is its root", vocab: ["spread around the mean", "square root"] },
        explanation: { idea: "Squared units vs the original unit", vocab: ["expected squared distance", "same unit as the data"] },
        example: { idea: "Volatility in finance", vocab: ["For example", "volatility"] },
        link: { idea: "Why people quote standard deviation", vocab: ["That's why", "calculate first"] },
      },
    },
    {
      part: 2,
      question: "Explain how combining two assets can reduce the risk of a portfolio.",
      cues: [
        "what expectation and variance tell you about an asset",
        "what covariance and correlation measure",
        "how the portfolio risk is calculated",
        "and explain why diversification works",
      ],
      sample: {
        point:
          "I'd like to explain how mixing two assets can make a portfolio safer, because it shows exactly why covariance matters. For each asset, the expectation is its average return and the variance, or its square root, the volatility, tells you how risky it is.",
        explanation:
          "Now, expectation is linear with no conditions at all, so the expected return of a portfolio is simply the weighted average of the two assets' expected returns. Variance is different. It isn't linear: if you scale an asset by a weight, its variance gets multiplied by the square of that weight, and when you add two assets you pick up a cross term. That cross term is the covariance, which measures whether the two assets tend to be above their means at the same time. If you divide it by both standard deviations, you get the correlation, which always lies between minus one and one.",
        example:
          "Let's say I put a weight w in asset A and the rest in asset B. The portfolio variance is w squared times A's variance, plus one minus w squared times B's variance, plus two times the weights times the correlation times both volatilities. If the correlation is one, the risk is just a straight line between the two assets, so mixing doesn't help. But as soon as the correlation drops below one, the risk curve sags below that line, and at minus one you can actually reach zero risk. If you set the derivative to zero, you even get the minimum-risk weight.",
        link:
          "So diversification works because of that cross term. The return is an average, but the risk is less than the average whenever the assets don't move perfectly together. That's why I find it such a neat idea: just three numbers, the mean, the variance and the covariance, are enough to start measuring portfolio risk.",
      },
      peel: {
        point: { idea: "Introduce the topic and define mean and volatility", vocab: ["I'd like to explain", "average return", "volatility"] },
        explanation: { idea: "Linear expectation vs non-linear variance", vocab: ["linear with no conditions", "cross term", "covariance", "correlation"] },
        example: { idea: "Walk through the two-asset formula", vocab: ["Let's say", "straight line", "sags below", "minimum-risk weight"] },
        link: { idea: "Why the cross term makes diversification work", vocab: ["diversification works", "move perfectly together", "neat idea"] },
      },
    },
    {
      part: 3,
      question: "Why are expectation, variance and covariance so important in finance?",
      sample: {
        point: "I'd say they're important because together they describe both the reward and the risk of an investment.",
        explanation:
          "Expectation tells you how much you earn on average, variance tells you how bumpy the ride is, and covariance tells you how different assets move together. Without the third one, you can't see the benefit of diversification at all.",
        example:
          "For instance, with many assets the same idea becomes a covariance matrix, and the portfolio variance is just the weight vector times that matrix times the weight vector again. Fund managers use exactly this to decide how much to hold in each asset.",
        link: "So these three simple numbers are really the foundation of modern portfolio thinking.",
      },
      peel: {
        point: { idea: "They capture reward and risk", vocab: ["both the reward and the risk"] },
        explanation: { idea: "What each of the three numbers tells you", vocab: ["on average", "how bumpy the ride is", "move together"] },
        example: { idea: "The covariance matrix for many assets", vocab: ["For instance", "covariance matrix", "weight vector"] },
        link: { idea: "Call them the foundation", vocab: ["foundation"] },
      },
    },
    {
      part: 3,
      question: "How do we estimate these values from data, and what makes it difficult?",
      sample: {
        point: "We estimate them from a sample, because we never get to see the true values.",
        explanation:
          "The sample mean is just the average of the data, and the sample variance usually divides by n minus one instead of n, so that the estimate is unbiased. The tricky part is that means are much harder to estimate than volatilities, because the error of the sample mean only shrinks with the square root of the number of observations.",
        example:
          "For example, daily stock returns have a tiny drift compared with their daily volatility. If you only use a few months of data, the sample mean jumps around a lot, while the sample standard deviation stays fairly close to the truth.",
        link: "That's why, in practice, analysts tend to trust volatility estimates far more than estimates of expected returns.",
      },
      peel: {
        point: { idea: "We only ever have a sample", vocab: ["from a sample", "true values"] },
        explanation: { idea: "n − 1 and the slow-shrinking error of the mean", vocab: ["n minus one", "unbiased", "square root of the number"] },
        example: { idea: "Tiny drift vs large daily volatility", vocab: ["For example", "tiny drift", "jumps around"] },
        link: { idea: "Which estimate people trust more", vocab: ["That's why", "in practice", "far more than"] },
      },
    },
    {
      part: 3,
      question: "When can correlation and variance be misleading?",
      sample: {
        point: "They can be misleading whenever the data doesn't behave as nicely as the formulas assume.",
        explanation:
          "Correlation only picks up linear co-movement, so two variables can be strongly dependent and still have a correlation close to zero. On top of that, correlations aren't stable over time, and heavy tails mean that a single extreme day can shift the sample variance a lot.",
        example:
          "A classic example is a market crash. Many assets suddenly fall together and their correlation jumps towards one, which is exactly when you need diversification the most. Another common mistake is scaling risk to a year: volatility grows with the square root of time, roughly the square root of 252 trading days, while the mean grows with time itself.",
        link: "So I'd say these measures are a great starting point, but you should always question them, especially in stressful markets.",
      },
      peel: {
        point: { idea: "When data breaks the assumptions", vocab: ["misleading", "behave as nicely"] },
        explanation: { idea: "Linear only, unstable, heavy tails", vocab: ["linear co-movement", "aren't stable", "heavy tails"] },
        example: { idea: "Crashes and the square-root-of-time rule", vocab: ["A classic example", "jumps towards one", "square root of time"] },
        link: { idea: "Useful, but question them", vocab: ["a great starting point", "stressful markets"] },
      },
    },
  ],
});
