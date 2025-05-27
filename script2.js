document
  .getElementById('simulationForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const simulations = parseInt(document.getElementById('simulations').value);

    // Calcular resultado exacto
    const mathematicalResult = calculateExactResult();
    document.getElementById('mathematicalResult').textContent =
      mathematicalResult.toFixed(4);

    // Calcular aproximación Monte Carlo
    const monteCarloResult = monteCarloIntegration(simulations);
    document.getElementById('monteCarloResult').textContent =
      monteCarloResult.toFixed(4);

    // Calcular porcentaje de error
    const errorPercentage = calculateErrorPercentage(
      mathematicalResult,
      monteCarloResult
    );
    document.getElementById('errorPercentage').textContent =
      errorPercentage.toFixed(2) + '%';
  });

function calculateExactResult() {
  const a = 4;
  const b = 6;
  const integralTerm = (5 / 2) * (b ** 2 - a ** 2); // ∫5x dx from 4 to 6
  const constantTerm = (3 ** b - 3 ** a) / Math.log(3); // ∫3^x dx from 4 to 6
  return integralTerm + constantTerm;
}

function monteCarloIntegration(simulations) {
  const a = 4;
  const b = 6;
  const fxMax = 5 * b + 3 ** b; // Suponemos que el máximo valor de f(x) ocurre en x = 6

  let pointsUnderCurve = 0;

  for (let i = 0; i < simulations; i++) {
    const x = a + Math.random() * (b - a);
    const y = Math.random() * fxMax;
    const fx = 5 * x + 3 ** x;

    if (y <= fx) {
      pointsUnderCurve++;
    }
  }

  const area = (b - a) * fxMax * (pointsUnderCurve / simulations);
  return area;
}

function calculateErrorPercentage(actual, approx) {
  return Math.abs((actual - approx) / actual) * 100;
}
