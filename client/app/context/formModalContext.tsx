import { createContext } from "react";
import { FormModal } from "../types";

export const FormModalContext = createContext<FormModal>({
  fieldValue: "",
  setFieldValue: () => {},
  modalOpen: false,
  setModalOpen: () => {},
});
