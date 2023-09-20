export const inputTypes = {
  TITLE: 'TITLE',
  TEXT: 'TEXT',
  TEXTAREA: 'TEXTAREA',
  RADIO: 'RADIO',
  CHECKBOX: 'CHECKBOX',
} as const;
export type InputTypes = (typeof inputTypes)[keyof typeof inputTypes];

export interface IItemTypeProps {
  id: string;
  text?: string;
  isEtc?: boolean;
}

export interface ICardProps {
  id: string;
  cardTitle: string;
  inputType: InputTypes;
  contents: string | IItemTypeProps[];
  isFocused: boolean;
  isRequired: boolean;
}

export interface IStateProps {
  cards: ICardProps[];
}

export interface IPayloadProps {
  [key: string]: string;
}

export interface IActionProps {
  type: string;
  payload: IPayloadProps;
}
