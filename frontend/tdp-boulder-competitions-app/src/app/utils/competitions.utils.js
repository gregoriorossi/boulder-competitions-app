"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionsUtils = void 0;
var competitions_models_1 = require("../models/competitions.models");
var CompetitionsUtils = /** @class */ (function () {
    function CompetitionsUtils() {
    }
    CompetitionsUtils.StateToString = function (state) {
        if (state === competitions_models_1.CompetitionStateType.ONGOING)
            return "In corso";
        if (state === competitions_models_1.CompetitionStateType.CLOSED)
            return "Chiusa";
        if (state === competitions_models_1.CompetitionStateType.DRAFT)
            return "In lavorazione";
        return "";
    };
    CompetitionsUtils.StateToCssClass = function (state) {
        if (state === competitions_models_1.CompetitionStateType.ONGOING)
            return "bg-success";
        if (state === competitions_models_1.CompetitionStateType.CLOSED)
            return "bg-danger";
        if (state === competitions_models_1.CompetitionStateType.DRAFT)
            return "bg-warning";
        return "";
    };
    CompetitionsUtils.BoulderProblemColorToCssClass = function (color) {
        if (color === competitions_models_1.BoulderProblemsColors.WHITE)
            return "bg-white";
        if (color === competitions_models_1.BoulderProblemsColors.BLUE)
            return "bg-blue";
        if (color === competitions_models_1.BoulderProblemsColors.GREEN)
            return "bg-green";
        if (color === competitions_models_1.BoulderProblemsColors.YELLOW)
            return "bg-yellow";
        if (color === competitions_models_1.BoulderProblemsColors.RED)
            return "bg-red";
        if (color === competitions_models_1.BoulderProblemsColors.BLACK)
            return "bg-black";
        return "";
    };
    return CompetitionsUtils;
}());
exports.CompetitionsUtils = CompetitionsUtils;
//# sourceMappingURL=competitions.utils.js.map