import { createContext } from "react";

export const mycon = createContext({
  c_branch: null,
  branchdet: null,

  c_acad: null,
  setc_acad: () => {},
});
