export async function undo(action){

    switch(action.payload.entity){

        case "goal":

            await restoreGoal(action.payload.data);

            break;

        case "budget":

            await restoreBudget(action.payload.data);

            break;
    }
}
