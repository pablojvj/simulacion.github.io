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
  const ln16 = Math.log(16);
  const integralTerm = 15 / 2; // ∫3x dx from 2 to 3
  const constantTerm = (7 / 3) * ln16;
  return integralTerm + constantTerm;
}

function monteCarloIntegration(simulations) {
  const a = 2;
  const b = 3;
  const fxMax = 3 * b + (7 / 3) * Math.log(16); // Máximo valor de f(x) en [2, 3]

  let pointsUnderCurve = 0;

  for (let i = 0; i < simulations; i++) {
    const x = a + Math.random() * (b - a);
    const y = Math.random() * fxMax;
    const fx = 3 * x + (7 / 3) * Math.log(16);

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
