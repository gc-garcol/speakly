// Tech concept: Quantitative finance (what / how / why / when)
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "quantitative",
  name: "Quantitative Finance",
  questions: [
    {
      part: 1,
      question: "What is quantitative trading?",
      sample: {
        point: "Quantitative trading is a way of trading financial assets using mathematical models and data, instead of gut feeling.",
        explanation: "Quants look for patterns in historical prices and other data, turn them into clear rules, and then let computers execute those rules automatically.",
        example: "For example, a simple strategy might buy a stock when its price falls far below its 20-day average, betting that it will bounce back.",
        link: "So in short, it's about replacing emotional decisions with rules that can be tested and measured.",
      },
      peel: {
        point: { idea: "A one-sentence definition", vocab: ["mathematical models", "instead of gut feeling"] },
        explanation: { idea: "What quants actually do", vocab: ["look for patterns", "execute those rules automatically"] },
        example: { idea: "A simple rule-based strategy", vocab: ["far below its 20-day average", "bounce back"] },
        link: { idea: "The core idea in plain words", vocab: ["in short", "replacing emotional decisions"] },
      },
    },
    {
      part: 1,
      question: "What is the difference between return and risk?",
      sample: {
        point: "Return is how much money an investment makes, while risk is how uncertain or volatile that return is.",
        explanation: "Two investments can have the same average return, but one might swing up and down much more, which means you could lose a lot at the wrong moment.",
        example: "For instance, a savings account might give a steady 5% a year, whereas a tech stock might average 10% but drop 30% in a bad year.",
        link: "That's why investors usually look at both together, for example using the Sharpe ratio, which measures return per unit of risk.",
      },
      peel: {
        point: { idea: "Define both in one sentence", vocab: ["how much money an investment makes", "volatile"] },
        explanation: { idea: "Why the same return can feel very different", vocab: ["the same average return", "swing up and down"] },
        example: { idea: "A savings account vs a tech stock", vocab: ["a steady 5% a year", "whereas"] },
        link: { idea: "How investors combine the two", vocab: ["That's why", "return per unit of risk"] },
      },
    },
    {
      part: 2,
      question: "Explain how you would test a trading strategy before using real money.",
      cues: [
        "what the strategy is",
        "what data you would use",
        "how you would test it",
        "and explain what could go wrong",
      ],
      sample: {
        point:
          "I'd like to explain how I would backtest a simple trading strategy before risking any real money. Let's say the idea is a momentum strategy: buy the stocks that have gone up the most over the past six months, and sell them after one month.",
        explanation:
          "The reason backtesting matters is that an idea can sound brilliant but lose money in practice. A backtest replays the strategy on historical data, as if you had traded it in the past, so you can measure its returns, its volatility and its worst losses before committing any capital.",
        example:
          "First, I would collect daily prices for a broad set of stocks over at least ten years, including companies that later went bankrupt; otherwise the results suffer from survivorship bias. Then I would split the data into two parts. I'd design and tune the strategy on the first part only, and then run it once on the second part, which it has never seen. I would also include realistic trading costs, because a strategy that trades a lot can look profitable on paper but lose money once fees and slippage are added.",
        link:
          "What could go wrong is mainly overfitting: if you try hundreds of variations, one of them will look amazing purely by luck. So in my view, a good backtest is less about finding a great result and more about trying hard to prove that the strategy doesn't work. If it still survives, then it might be worth testing with a small amount of real money.",
      },
      peel: {
        point: { idea: "Describe the strategy you'll test", vocab: ["backtest", "momentum strategy"] },
        explanation: { idea: "Why backtesting matters", vocab: ["sound brilliant but lose money", "replays the strategy on historical data", "committing any capital"] },
        example: { idea: "Data, train/test split and trading costs", vocab: ["survivorship bias", "split the data into two parts", "trading costs"] },
        link: { idea: "The biggest danger + your overall view", vocab: ["overfitting", "purely by luck", "prove that the strategy doesn't work"] },
      },
    },
    {
      part: 3,
      question: "Why is risk management so important in trading?",
      sample: {
        point: "I believe risk management is the most important part of trading, even more important than finding good strategies.",
        explanation: "No model is right all the time, so the real question is not whether you will lose money, but how much you can lose before you're forced to stop.",
        example: "A famous example is Long-Term Capital Management, a hedge fund whose partners included Nobel Prize winners. It collapsed in 1998 because it used huge amounts of borrowed money and couldn't survive a market shock.",
        link: "So in my opinion, controlling position sizes and limiting losses is what keeps traders in the game long enough for their strategies to work.",
      },
      peel: {
        point: { idea: "Give a strong opinion", vocab: ["I believe", "even more important than"] },
        explanation: { idea: "Why losses are unavoidable", vocab: ["No model is right all the time", "forced to stop"] },
        example: { idea: "A famous hedge fund collapse", vocab: ["A famous example is", "borrowed money", "market shock"] },
        link: { idea: "What risk management really does", vocab: ["position sizes", "keeps traders in the game"] },
      },
    },
    {
      part: 3,
      question: "What is the difference between correlation and causation?",
      sample: {
        point: "Correlation means two things tend to move together, while causation means one thing actually makes the other happen.",
        explanation: "The problem is that two variables can be strongly correlated simply because a third factor drives both of them, or just by coincidence when you look at enough data.",
        example: "For instance, ice cream sales and drowning accidents both rise in summer, but ice cream doesn't cause drowning; hot weather increases both. In finance, people often find spurious patterns, like a stock index that seems to follow the results of a football league.",
        link: "That's why quants try to find an economic reason behind a pattern, rather than trusting a correlation on its own.",
      },
      peel: {
        point: { idea: "Define both clearly", vocab: ["tend to move together", "actually makes the other happen"] },
        explanation: { idea: "Why correlation can mislead", vocab: ["a third factor", "by coincidence"] },
        example: { idea: "Ice cream and drowning + a finance example", vocab: ["ice cream sales", "spurious patterns"] },
        link: { idea: "What quants do about it", vocab: ["an economic reason", "on its own"] },
      },
    },
    {
      part: 3,
      question: "Can we trust financial models to predict the market?",
      sample: {
        point: "I think we can trust financial models to some extent, but never completely.",
        explanation: "Models are built on historical data, and they assume the future will behave roughly like the past, which isn't true during a crisis.",
        example: "The 2008 financial crisis is a clear example: many risk models had assumed that house prices across the US would not fall at the same time, so they badly underestimated the losses when they did.",
        link: "So I'd say models are useful tools for making decisions, but people should always combine them with common sense and be ready for events the model has never seen.",
      },
      peel: {
        point: { idea: "A balanced answer", vocab: ["to some extent", "never completely"] },
        explanation: { idea: "The key assumption behind models", vocab: ["historical data", "during a crisis"] },
        example: { idea: "The 2008 financial crisis", vocab: ["a clear example", "badly underestimated"] },
        link: { idea: "How to use models wisely", vocab: ["useful tools", "common sense"] },
      },
    },
  ],
});
