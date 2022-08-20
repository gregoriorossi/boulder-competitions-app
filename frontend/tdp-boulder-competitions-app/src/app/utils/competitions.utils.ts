import { BoulderProblemsColors, CompetitionStateType } from "../models/competitions.models";

export class CompetitionsUtils {

  public static StateToString(state: CompetitionStateType): string {
    if (state === CompetitionStateType.ONGOING)
      return "In corso";

    if (state === CompetitionStateType.CLOSED)
      return "Chiusa";

    if (state === CompetitionStateType.DRAFT)
      return "In lavorazione";

    return "";
  }

  public static StateToCssClass(state: CompetitionStateType): string {
    if (state === CompetitionStateType.ONGOING)
      return "bg-success";

    if (state === CompetitionStateType.CLOSED)
      return "bg-danger";

    if (state === CompetitionStateType.DRAFT)
      return "bg-warning";

    return "";
  }

  public static BoulderProblemColorToCssClass(color: BoulderProblemsColors): string {
    if (color === BoulderProblemsColors.WHITE)
      return "bg-white";
    if (color === BoulderProblemsColors.BLUE)
      return "bg-blue";
    if (color === BoulderProblemsColors.GREEN)
      return "bg-green";
    if (color === BoulderProblemsColors.YELLOW)
      return "bg-yellow";
    if (color === BoulderProblemsColors.RED)
      return "bg-red";
    if (color === BoulderProblemsColors.BLACK)
      return "bg-black";

    return "";
  }
}
