export default class UIManager {
  static ShowGameOver(points, isWin) {
    gameEndDiv.style.display = "flex";
    gameEndScoreSpan.textContent = points;
    gameWinLoseSpan.textContent = isWin ? "Win!" : "Lose!";
  }
}
