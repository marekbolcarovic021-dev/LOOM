import { navigateToEntity } from "./navigationService";

export function executeAction(action) {
    if (!action) return;

    switch (action.type) {
        case "navigate":
            navigateToEntity(action.entity);
            break;

        case "callback":
            action.callback?.();
            break;

        default:
            console.warn("Unknown action type", action.type);
    }
}