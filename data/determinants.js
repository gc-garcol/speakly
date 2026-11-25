// Tech concept: Determinants
// Source: https://gc-garcol.github.io/cafe-docs/content/math/determinants/determinants.html
// sample follows PEEL: Point – Explanation – Example – Link
window.SPEAKUP_TOPICS.push({
  id: "determinants",
  name: "Determinants",
  questions: [
    {
      part: 1,
      question: "What is a determinant?",
      sample: {
        point: "A determinant is a single number attached to a square matrix that tells you how much the matrix scales area or volume.",
        explanation:
          "A linear map turns every little grid square into the same parallelogram, so every shape gets its area multiplied by the same factor, and that factor is the absolute value of the determinant.",
        example: "For example, if a two by two matrix has a determinant of three, a circle with an area of one becomes an ellipse with an area of three.",
        link: "So in one number, the determinant sums up how strongly a matrix stretches or squashes space.",
      },
      peel: {
        point: { idea: "Define it as an area or volume factor", vocab: ["single number", "scales area or volume"] },
        explanation: { idea: "Why every shape scales by the same factor", vocab: ["the same parallelogram", "absolute value"] },
        example: { idea: "A circle turning into an ellipse", vocab: ["For example", "becomes an ellipse"] },
        link: { idea: "Sum it up in one sentence", vocab: ["in one number", "stretches or squashes"] },
      },
    },
    {
      part: 2,
      question: "Explain what the determinant tells you about a matrix.",
      cues: [
        "how it measures area or volume",
        "what its sign means",
        "how to calculate it for a two by two matrix",
        "and explain what a zero determinant means",
      ],
      sample: {
        point:
          "I'd like to talk about the determinant, which is one formula with three meanings: it tells you how much a matrix scales area, whether it flips orientation, and whether the matrix can be undone at all.",
        explanation:
          "First, area. A linear map keeps grid lines straight, parallel and evenly spaced, so the unit square becomes a parallelogram whose sides are the columns of the matrix, and its area is the absolute value of the determinant. In three dimensions the same number scales volume. Second, the sign. If going from the first column to the second is still counter-clockwise, the determinant is positive; if the plane has been mirrored, it's negative. Third, for a two by two matrix with entries a, b, c and d, the determinant is simply ad minus bc. You can prove it by drawing the parallelogram inside a box and cutting away the corner pieces.",
        example:
          "For example, take the columns three, one and one, two. The determinant is three times two minus one times one, which is five, so every shape becomes five times bigger. If I drag the two columns until they lie on the same line, the parallelogram collapses and the determinant drops to zero. That means the matrix has squashed the whole plane onto a line, information has been lost, and there's no way to get it back.",
        link:
          "So a zero determinant is the key warning sign: it means the matrix has no inverse, its columns aren't independent, and a system of equations with that matrix won't have exactly one solution. That's why the determinant is such a quick and powerful test.",
      },
      peel: {
        point: { idea: "One formula with three meanings", vocab: ["three meanings", "flips orientation", "can be undone"] },
        explanation: { idea: "Area, then sign, then the 2×2 formula", vocab: ["straight, parallel and evenly spaced", "counter-clockwise", "mirrored", "ad minus bc", "cutting away the corner pieces"] },
        example: { idea: "Work out a determinant of five, then collapse it", vocab: ["take the columns", "five times bigger", "collapses", "squashed the whole plane"] },
        link: { idea: "What zero tells you", vocab: ["key warning sign", "no inverse", "quick and powerful test"] },
      },
    },
    {
      part: 3,
      question: "How do computers calculate determinants of large matrices?",
      sample: {
        point: "Computers use row reduction, because the textbook method, cofactor expansion, becomes impossibly slow for large matrices.",
        explanation:
          "Cofactor expansion keeps calling itself on smaller matrices, which adds up to about n factorial products. Row reduction clears everything below the diagonal using row operations that don't change the determinant, and then simply multiplies the pivots, flipping the sign for every row swap.",
        example:
          "For instance, for a twenty by twenty matrix, cofactor expansion needs around two times ten to the eighteen products, while row reduction needs only about five thousand operations. That's the difference between waiting for years and getting an instant answer.",
        link: "So in practice, the determinant is almost always computed as a by-product of elimination.",
      },
      peel: {
        point: { idea: "Row reduction, not cofactor expansion", vocab: ["row reduction", "impossibly slow"] },
        explanation: { idea: "Why one is n! and the other multiplies pivots", vocab: ["n factorial", "below the diagonal", "multiplies the pivots"] },
        example: { idea: "Compare costs for a 20×20 matrix", vocab: ["For instance", "waiting for years"] },
        link: { idea: "A by-product of elimination", vocab: ["in practice", "by-product of elimination"] },
      },
    },
    {
      part: 3,
      question: "Why is it a bad idea to check whether a matrix is singular by testing if its determinant is zero?",
      sample: {
        point: "In floating-point code, testing whether the determinant equals zero, or is below a small threshold, is unreliable.",
        explanation:
          "The determinant multiplies many numbers together, so its size depends heavily on the scale of the matrix, not just on whether it's close to being singular. A perfectly healthy matrix can have a tiny determinant.",
        example:
          "For example, a hundred by hundred identity matrix scaled by zero point one has a determinant of ten to the minus one hundred, yet it's very well behaved and easy to invert. A threshold test would wrongly call it singular.",
        link: "That's why it's better to use the rank or the condition number when you need to know if a matrix is safe to work with.",
      },
      peel: {
        point: { idea: "It's unreliable in floating point", vocab: ["floating-point", "unreliable"] },
        explanation: { idea: "Size depends on scale, not singularity", vocab: ["depends heavily on the scale", "perfectly healthy"] },
        example: { idea: "0.1 times the identity", vocab: ["ten to the minus one hundred", "well behaved", "wrongly call it singular"] },
        link: { idea: "What to use instead", vocab: ["condition number", "safe to work with"] },
      },
    },
    {
      part: 3,
      question: "Where are determinants used in practice?",
      sample: {
        point: "Determinants show up in many areas, including calculus, geometry, statistics and computer graphics.",
        explanation:
          "Wherever you need to know how a transformation changes area or volume, or whether it flips orientation, the determinant gives you the answer in a single number.",
        example:
          "For example, when you change variables in an integral, you scale by the determinant of the Jacobian, which is where the extra r in polar coordinates comes from. In geometry code, the sign of a small determinant tells you whether three points turn left or right, which convex hull algorithms rely on. And in graphics, a negative determinant flips triangle winding, so renderers have to swap back-face culling.",
        link: "So although it looks like an abstract formula, the determinant is a very practical tool.",
      },
      peel: {
        point: { idea: "List the main areas", vocab: ["show up in many areas"] },
        explanation: { idea: "Why: area, volume and orientation", vocab: ["Wherever you need to know", "a single number"] },
        example: { idea: "Jacobian, orientation tests, graphics", vocab: ["Jacobian", "turn left or right", "back-face culling"] },
        link: { idea: "Abstract formula, practical tool", vocab: ["abstract formula", "very practical tool"] },
      },
    },
    {
      part: 3,
      question: "When should you use Cramer's rule, and when should you avoid it?",
      sample: {
        point: "Cramer's rule is great for small systems and for proofs, but you should avoid it for large systems.",
        explanation:
          "It writes each unknown directly as a ratio of two determinants: you replace one column of the matrix with the right-hand side and divide by the original determinant. That's elegant, but it means computing a separate determinant for every unknown.",
        example:
          "For instance, for two x plus y equals five and x minus y equals one, the main determinant is minus three, and the rule quickly gives x equals two and y equals one. For a system with thousands of unknowns, though, elimination is far faster.",
        link: "So I'd use Cramer's rule when I want a neat formula, and elimination when I want a fast answer.",
      },
      peel: {
        point: { idea: "Small systems yes, large systems no", vocab: ["small systems and for proofs", "avoid it"] },
        explanation: { idea: "How it works and why it's costly", vocab: ["ratio of two determinants", "right-hand side", "for every unknown"] },
        example: { idea: "Solve a 2×2 system, then scale up", vocab: ["main determinant is minus three", "far faster"] },
        link: { idea: "Neat formula vs fast answer", vocab: ["a neat formula", "a fast answer"] },
      },
    },
  ],
});
