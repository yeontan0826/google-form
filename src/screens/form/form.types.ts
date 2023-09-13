import { ICardProps } from '@redux/store';

export interface IFormUI {
  cards: ICardProps[];
  addNewCard: () => void;
  handleGoPreview: () => void;
}
