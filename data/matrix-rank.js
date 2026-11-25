// Tech concept: Matrix Rank
// Source: https://gc-garcol.github.io/cafe-docs/content/math/matrix-rank/matrix-rank.html
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "matrix-rank",
  name: "Matrix Rank",
  questions: [
    {
      part: 1,
      question: "What is the rank of a matrix?",
      sample: {
        point: "The rank of a matrix is the number of independent columns it has, which is the dimension of the space those columns span.",
        explanation:
          "Some columns can be redundant because you can build them from the others, so the rank tells you how many directions the matrix really uses. Surprisingly, the number of independent rows is always the same.",
        example: "For instance, if one column is just the sum of two others, it doesn't add a new direction, so it doesn't increase the rank.",
        link: "So rank is a simple way to measure how much information a matrix actually keeps.",
      },
      peel: {
        point: { idea: "Define rank as independent columns", vocab: ["independent columns", "space those columns span"] },
        explanation: { idea: "Redundant columns, and rows give the same number", vocab: ["redundant", "really uses", "independent rows"] },
        example: { idea: "A column that is the sum of others", vocab: ["For instance", "a new direction"] },
        link: { idea: "Rank measures information kept", vocab: ["how much information"] },
      },
    },
    {
      part: 2,
      question: "Explain how you find the rank of a matrix and what it tells you about a system of equations.",
      cues: [
        "how row reduction finds the rank",
        "an example of a matrix with a redundant row",
        "what the rank-nullity theorem says",
        "and explain how rank decides the number of solutions",
      ],
      sample: {
        point:
          "I'd like to explain how to find the rank of a matrix and why it's so useful for solving systems of equations. In short, you count the pivots after row reduction, and that number tells you how many of your equations are genuinely different.",
        explanation:
          "Gaussian elimination only uses three row operations: swapping two rows, scaling a row, and adding a multiple of one row to another. None of them changes the rank. You keep reducing until each pivot is the only nonzero entry in its column, and the number of pivots is the rank. Columns without a pivot are combinations of earlier columns, and each one gives a free direction in the null space, which is the set of vectors the matrix sends to zero. This leads to the rank-nullity theorem: the rank plus the dimension of the null space equals the number of columns.",
        example:
          "For example, take a three by three matrix whose second row is exactly twice the first. After reduction, that row turns into zeros and only two pivots remain, so the rank is two, not three. Now, to decide how many solutions a system has, you compare the rank of the matrix with the rank of the augmented matrix, the one with the right-hand side attached. If the augmented one is bigger, the equations contradict each other and there's no solution. If they're equal and match the number of unknowns, there's exactly one. If they're equal but smaller, there are infinitely many, with one free parameter for every missing pivot.",
        link:
          "So I think rank is one of the most practical ideas in linear algebra, because a single number tells you whether a system has no solution, one solution or infinitely many.",
      },
      peel: {
        point: { idea: "Count pivots; it tells you real equations", vocab: ["count the pivots", "genuinely different"] },
        explanation: { idea: "Row operations, pivots, null space, rank-nullity", vocab: ["three row operations", "None of them changes the rank", "free direction", "null space", "rank-nullity theorem"] },
        example: { idea: "A doubled row, then the three solution cases", vocab: ["exactly twice the first", "augmented matrix", "contradict each other", "free parameter"] },
        link: { idea: "One number decides the solutions", vocab: ["most practical ideas", "a single number"] },
      },
    },
    {
      part: 3,
      question: "Why do software libraries compute rank using singular values?",
      sample: {
        point: "Libraries use singular values because, with floating-point numbers, \"exactly zero\" becomes fuzzy.",
        explanation:
          "During row reduction, rounding errors can leave a tiny value like ten to the minus sixteen where the true answer is zero, so simply counting nonzero pivots can give the wrong rank. Singular values measure how much the matrix stretches each direction, so you can count the ones above a tolerance instead.",
        example:
          "For instance, if a data matrix has one column that's almost a copy of another, its smallest singular value will be close to zero, and the library will report a lower rank, which is usually what you actually want.",
        link: "So using a tolerance on singular values gives a much more reliable answer than trusting exact zeros.",
      },
      peel: {
        point: { idea: "Floating point makes zero fuzzy", vocab: ["floating-point numbers", "becomes fuzzy"] },
        explanation: { idea: "Rounding errors vs a tolerance", vocab: ["rounding errors", "the wrong rank", "above a tolerance"] },
        example: { idea: "A nearly duplicated column", vocab: ["almost a copy", "close to zero"] },
        link: { idea: "More reliable than exact zeros", vocab: ["much more reliable"] },
      },
    },
    {
      part: 3,
      question: "How is the idea of low rank useful in real applications?",
      sample: {
        point: "Low rank is useful because it means a big matrix can be described with far fewer numbers, so it's compressible.",
        explanation:
          "A rank one matrix is just one column times one row, and a low-rank matrix is a sum of only a few of those. If most of the information sits in a few directions, you can throw the rest away without losing much.",
        example:
          "A classic example is image compression: keeping only the top k singular values gives the best rank k approximation of an image, and it often still looks almost the same. In statistics, on the other hand, a rank-deficient data matrix is a warning sign, because it means some features are copies of others, and regression breaks.",
        link: "So depending on the situation, low rank can be either a great opportunity for compression or a red flag in your data.",
      },
      peel: {
        point: { idea: "Low rank means compressible", vocab: ["far fewer numbers", "compressible"] },
        explanation: { idea: "Rank one pieces and throwing the rest away", vocab: ["one column times one row", "a few directions", "without losing much"] },
        example: { idea: "Image compression vs broken regression", vocab: ["A classic example", "best rank k approximation", "rank-deficient", "regression breaks"] },
        link: { idea: "Opportunity or red flag", vocab: ["great opportunity", "a red flag"] },
      },
    },
    {
      part: 3,
      question: "What happens to the rank when you multiply matrices?",
      sample: {
        point: "When you multiply two matrices, the rank of the product can never be larger than the smaller of the two ranks.",
        explanation:
          "Multiplying never adds information. Each matrix can only keep or lose directions, so once one of them has crushed a direction to zero, the other can't bring it back.",
        example:
          "For example, if you multiply any matrix by a rank one matrix, the result has rank at most one, no matter how rich the first matrix is. That's also why two linear layers with a narrow layer in the middle can only pass as many directions as that middle layer is wide.",
        link: "So when you chain matrices together, the weakest link sets the limit on the rank.",
      },
      peel: {
        point: { idea: "The product's rank is capped", vocab: ["can never be larger", "the smaller of the two ranks"] },
        explanation: { idea: "Multiplying never adds information", vocab: ["never adds information", "crushed a direction"] },
        example: { idea: "A rank one factor and a narrow layer", vocab: ["rank at most one", "narrow layer"] },
        link: { idea: "The weakest link sets the limit", vocab: ["weakest link"] },
      },
    },
  ],
});
