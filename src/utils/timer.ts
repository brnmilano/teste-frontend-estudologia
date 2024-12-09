/**
 * Inicia um timer que conta a partir de um tempo total em minutos.
 *
 * @param totalMinutes - O tempo total do timer em minutos.
 * @param updateTime - Função de callback para atualizar o tempo restante em segundos.
 * @param onComplete - Função de callback para ser chamada quando o timer chegar a 0.
 * @returns O identificador do intervalo (setInterval) para controle externo.
 */
export function startTimer(
  totalMinutes: number,
  updateTime: (remainingSeconds: number) => void,
  onComplete?: () => void
): NodeJS.Timeout {
  let totalSeconds = totalMinutes * 60;

  const timerInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);

      if (onComplete) onComplete();
    } else {
      totalSeconds--;

      updateTime(totalSeconds);
    }
  }, 1000);

  return timerInterval;
}
