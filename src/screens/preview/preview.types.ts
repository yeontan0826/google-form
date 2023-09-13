import { ICardProps } from '@redux/store';

export interface IPreviewUI {
  cards: ICardProps[];
  handleSubmit: () => void;
  handleGoBack: () => void;
}
