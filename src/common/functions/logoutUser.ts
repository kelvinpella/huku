import { redirect } from "next/navigation";
import { logoutUserAction } from "../actions/logoutUserAction";
import { revalidateSwrPartialKeys } from "./revalidateSwrPartialKeys";

export async function logoutUser() {
  const { error } = await logoutUserAction();
  if (!error) {
    await revalidateSwrPartialKeys(["user"]);
    redirect("/login");
  }
}
