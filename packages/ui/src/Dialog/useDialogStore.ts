import React from "react";

export interface DialogState {
  isOpen: boolean;
  dialogContent?: React.ReactNode;
}

type DialogAction =
  | { type: "OPEN_DIALOG"; payload: React.ReactNode }
  | { type: "CLOSE_DIALOG" };

const dialogReducer = (state: DialogState, action: DialogAction) => {
  switch (action.type) {
    case "OPEN_DIALOG":
      return {
        ...state,
        isOpen: true,
      };
    case "CLOSE_DIALOG":
      return {
        ...state,
        isOpen: false,
        dialogContent: undefined,
      };
    default:
      throw new Error();
  }
};

export const useDialogStore = () => {
  const [state, dispatch] = React.useReducer<typeof dialogReducer>(
    dialogReducer,
    {
      isOpen: false,
      dialogContent: null,
    }
  );

  return {
    isOpen: state.isOpen,
    dialogContent: state.dialogContent,
    openDialog: (content: React.ReactNode) =>
      dispatch({ type: "OPEN_DIALOG", payload: content }),
    closeDialog: () => dispatch({ type: "CLOSE_DIALOG" }),
  };
};
