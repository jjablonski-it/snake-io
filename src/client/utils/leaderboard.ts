import { Player, StateDTO } from "../../types";
import { LENGTH_PER_FRUIT, TAIL_LENGTH } from "../../utils/constants";

const leaderboard = document.querySelector("#lb");

export const updateLeaderboard = ({ me, players }: StateDTO) => {
  if (!leaderboard) return;

  const data = [me, ...players]
    .map(getPlayerScoreData)
    .sort((a, b) => b.score - a.score);

  leaderboard.innerHTML = `<ol>${scoreDataToHTML(data).join("")}</ol>`;
};

const getPlayerScoreData = ({ name, snake: { segments } }: Player) => {
  return {
    name,
    score: (segments.length - TAIL_LENGTH) / LENGTH_PER_FRUIT,
  };
};

const scoreDataToHTML = (data: ReturnType<typeof getPlayerScoreData>[]) => {
  return data.map(
    ({ name, score }) => `<li>${name} <span class=score>${score}</span></li>`
  );
};
