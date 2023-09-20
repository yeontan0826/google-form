import { ICardProps } from '@redux/reducer/types';

export interface IFormUI {
  cards: ICardProps[];
  addNewCard: () => void;
  handleGoPreview: () => void;
}
