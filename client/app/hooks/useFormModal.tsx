import { FormModal } from "../types";
import { useState } from "react";

export const useFormModal = (): FormModal => {
  const [fieldValue, setFieldValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return { fieldValue, setFieldValue, modalOpen, setModalOpen };
};
