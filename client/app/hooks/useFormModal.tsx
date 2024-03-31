import { useState } from "react";

export const useFormModal = () => {
  const [fieldValue, setFieldValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return { fieldValue, setFieldValue, modalOpen, setModalOpen };
};
