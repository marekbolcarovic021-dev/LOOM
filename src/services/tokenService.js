import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

export async function checkToken() {

  const checkTokenFunction =
    httpsCallable(
      functions,
      "checkToken"
    );

  const result =
    await checkTokenFunction();

  return result.data;
}


export async function consumeToken() {

  const consumeTokenFunction =
    httpsCallable(
      functions,
      "consumeToken"
    );

  const result =
    await consumeTokenFunction();

  return result.data;
}
