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
  const a = 0;
  const b = 9;
  const integralTerm = (b ** 2 - a ** 2) / 2; // ∫x dx from 0 to 9
  const constantTerm = (b - a) / Math.PI; // ∫1/π dx from 0 to 9
  return integralTerm + constantTerm;
}

function monteCarloIntegration(simulations) {
  const a = 0;
  const b = 9;
  const fxMax = b + 1 / Math.PI; // Máximo valor de f(x) en [0, 9]

  let pointsUnderCurve = 0;

  for (let i = 0; i < simulations; i++) {
    const x = a + Math.random() * (b - a);
    const y = Math.random() * fxMax;
    const fx = x + 1 / Math.PI;

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
