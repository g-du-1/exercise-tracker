import { StateCreator } from "zustand";

export interface FormModalSlice {
  fieldValue: string;
  modalOpen: boolean;
  setFieldValue: (newValue: string) => void;
  setModalOpen: (newValue: boolean) => void;
}

export const createFormModalSlice: StateCreator<
  FormModalSlice,
  [],
  [],
  FormModalSlice
> = (set) => ({
  fieldValue: "",
  modalOpen: false,
  setFieldValue: (newValue) => set({ fieldValue: newValue }),
  setModalOpen: (newValue) => set({ modalOpen: newValue }),
});
