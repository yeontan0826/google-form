import { ICardProps } from '@redux/reducer/types';
import { DragEndParams } from 'react-native-draggable-flatlist';

export interface IFormUI {
  cards: ICardProps[];
  onDragEnd: ({ from, to }: DragEndParams<ICardProps>) => void;
  addNewCard: () => void;
  handleGoPreview: () => void;
}
