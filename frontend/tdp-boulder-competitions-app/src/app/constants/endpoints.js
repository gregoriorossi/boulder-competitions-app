"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TDPApiEndpoints = void 0;
exports.TDPApiEndpoints = {
    Competitions: {
        GetAll: 'competitions',
        Get: function (id) { return "competitions/" + id; },
        GetInfo: function (id) { return "competitions/" + id + "/info"; },
        UpdateInfo: function (id) { return "competitions/" + id + "/info"; },
        Create: 'competitions',
        EditCompetition: function (id) { return "competitions/" + id; },
        Delete: function (id) { return "competitions/" + id; },
        SetState: "competitions/setState"
    },
    Problems: {
        Get: function (competitionId) { return "problems/" + competitionId; },
        GetColorsByCompetitionId: function (competitionId) { return "problems/" + competitionId + "/colors"; },
        StoreMultiple: "problems/storeMultiple"
    }
};
//# sourceMappingURL=endpoints.js.map