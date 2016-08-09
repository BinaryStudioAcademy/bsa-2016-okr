export function removeObjective(startParams) {
    const action = {
        type: 'REMOVE_OBJECTIVE',
        showObjectives:startParams.showObjectives
    };
    return action;
}

export function objectiveSearch(showObjectives) {
    const action = {
        type: 'SEARCH_OBJECTIVE',
        search: showObjectives.search,
        showObjectives: showObjectives
    };
    return action;
}
