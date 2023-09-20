import { ICardProps } from '@redux/reducer/types';

export interface IPreviewUI {
  cards: ICardProps[];
  handleSubmit: () => void;
  handleGoBack: () => void;
}
