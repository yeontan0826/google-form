import { createSlice } from '@reduxjs/toolkit';
import { getRandomId } from '@utils/getRandomId';
import {
  IActionProps,
  ICardProps,
  IItemTypeProps,
  InputTypes,
  inputTypes,
} from './types';

/**
 * 최초 생성되는 카드 목록
 */
const initialCard: ICardProps[] = [
  {
    id: getRandomId(),
    cardTitle: '제목 없는 설문지',
    inputType: inputTypes.TITLE,
    contents: '',
    isFocused: false,
    isRequired: false,
  },
  {
    id: getRandomId(),
    cardTitle: '',
    inputType: inputTypes.TEXT,
    contents: '',
    isFocused: false,
    isRequired: false,
  },
];

/**
 * 새로운 카드를 생성하는 함수
 *
 * @param {string} cardId - 해당 카드 id
 * @returns {ICardProps} 새로운 카드 객체
 */
const createNewCard = (cardId: string): ICardProps => ({
  id: cardId,
  cardTitle: '',
  inputType: inputTypes.RADIO,
  contents: [
    {
      id: getRandomId(),
      text: '옵션 1',
    },
  ],
  isFocused: true,
  isRequired: false,
});

/**
 * 보기 항목 정렬하는 함수
 *
 * @param {IItemTypeProps[]} currentContents - 현재 카드의 보기 항목들
 * @returns {IItemTypeProps[]} 정렬된 항목들
 */
const sortEtcItem = (currentContents: IItemTypeProps[]): IItemTypeProps[] => {
  const etcIndex: number = currentContents.findIndex(
    (content: IItemTypeProps) => content.isEtc,
  );
  if (etcIndex !== -1) {
    const etcItem: IItemTypeProps = { ...currentContents[etcIndex] };
    currentContents.splice(etcIndex, 1);
    currentContents.push(etcItem);
  }
  return currentContents;
};

/**
 * 카드 관련 리듀서
 */
const cardSlice = createSlice({
  name: 'reducer',
  initialState: [...initialCard] as ICardProps[],
  reducers: {
    /**
     * 카드를 추가하는 함수
     */
    addCard: (state: ICardProps[], action: IActionProps) => {
      const copiedState: ICardProps[] = state.map((card: ICardProps) => ({
        ...card,
        isFocused: false,
      }));

      copiedState.push(createNewCard(action.payload.cardId));
      return copiedState;
    },

    /**
     * 해당 카드를 삭제하는 함수
     */
    removeCard: (state: ICardProps[], action: IActionProps) => {
      const copiedState: ICardProps[] = state.map((card: ICardProps) => ({
        ...card,
        isFocused: false,
      }));

      const targetCardIndex: number = copiedState.findIndex(
        (card: ICardProps) => card.id === action.payload.cardId,
      );

      const filterState: ICardProps[] = copiedState.filter(
        (card: ICardProps) => card.id !== action.payload.cardId,
      );

      if (targetCardIndex !== 1) {
        return filterState.map((card: ICardProps, index: number) =>
          index === targetCardIndex - 1 ? { ...card, isFocused: true } : card,
        );
      }

      if (targetCardIndex === 1) {
        return filterState.map((card: ICardProps, index: number) =>
          index === targetCardIndex ? { ...card, isFocused: true } : card,
        );
      }

      return filterState;
    },

    /**
     * 해당 카드를 복사하는 함수
     */
    copyCard: (state: ICardProps[], action: IActionProps) => {
      const copiedState: ICardProps[] = state.map((card: ICardProps) => ({
        ...card,
        isFocused: false,
      }));
      const targetCard: ICardProps = copiedState.find(
        (card: ICardProps) => card.id === action.payload.cardId,
      ) as ICardProps;
      const targetCardIndex: number = copiedState.findIndex(
        (card: ICardProps) => card.id === action.payload.cardId,
      );
      const copiedCard: ICardProps = {
        ...targetCard,
        id: action.payload.copiedCardId,
        isFocused: true,
      };

      copiedState.splice(targetCardIndex + 1, 0, copiedCard);
      return copiedState;
    },

    /**
     * 해당 카드로 포커스하는 함수
     */
    focus: (state: ICardProps[], action: IActionProps) => {
      const copiedState: ICardProps[] = state.map((card: ICardProps) =>
        action.payload.id === card.id
          ? { ...card, isFocused: true }
          : { ...card, isFocused: false },
      );
      return copiedState;
    },

    /**
     * 해당 카드 설문 종류를 변경하는 함수
     */
    typeChange: (state: ICardProps[], action: IActionProps) => {
      const targetCard: ICardProps = state.find(
        (card: ICardProps) => card.id === action.payload.id,
      ) as ICardProps;

      if (
        !(
          targetCard.inputType === inputTypes.RADIO ||
          targetCard.inputType === inputTypes.CHECKBOX
        ) &&
        (action.payload.inputType === inputTypes.RADIO ||
          action.payload.inputType === inputTypes.CHECKBOX)
      ) {
        targetCard.contents = [
          {
            id: getRandomId(),
            text: '옵션 1',
          },
        ];
      } else if (
        (targetCard.inputType === inputTypes.RADIO ||
          targetCard.inputType === inputTypes.CHECKBOX) &&
        !(
          action.payload.inputType === inputTypes.RADIO ||
          action.payload.inputType === inputTypes.CHECKBOX
        )
      ) {
        targetCard.contents = '';
      }

      targetCard.inputType = action.payload.inputType as InputTypes;
    },

    /**
     * 카드 타이틀를 변경하는 함수
     */
    setTitle: (state: ICardProps[], action: IActionProps) => {
      const targetCard: ICardProps = state.find(
        (card: ICardProps) => card.id === action.payload.cardId,
      ) as ICardProps;
      targetCard.cardTitle = action.payload.title;
    },

    /**
     * 설문 종류가 작성형(설문지 설명, 단답형, 장문형)일 때, 내용을 변경하는 함수
     */
    setText: (state: ICardProps[], action: IActionProps) => {
      const targetCard: ICardProps = state.find(
        (card: ICardProps) => card.id === action.payload.cardId,
      ) as ICardProps;

      if (targetCard.inputType === inputTypes.TITLE) {
        targetCard.contents = action.payload.text;
      }

      if (
        targetCard.inputType === inputTypes.RADIO ||
        targetCard.inputType === inputTypes.CHECKBOX
      ) {
        const contents: IItemTypeProps[] =
          targetCard.contents as IItemTypeProps[];
        const targetContent: IItemTypeProps = contents.find(
          (content: IItemTypeProps) => content.id === action.payload.contentId,
        ) as IItemTypeProps;
        targetContent.text = action.payload.text;
      }
    },

    /**
     * 설문 종류가 선택형(객관식 질문, 체크박스)일 때, 선택 항목을 추가하는 함수
     */
    addSelectItem: (state: ICardProps[], action: IActionProps) => {
      const contents = state.find(
        (card: ICardProps) => card.id === action.payload.id,
      )?.contents as IItemTypeProps[];
      contents.push({
        id: action.payload.contentId,
        text: action.payload.text,
      });
      sortEtcItem(contents);
    },

    /**
     * 설문 종류가 선택형(객관식 질문, 체크박스)일 때, 선택 항목을 제거하는 함수
     */
    removeSelectItem: (state: ICardProps[], action: IActionProps) => {
      const targetCard: ICardProps = state.find(
        (card: ICardProps) => card.id === action.payload.cardId,
      ) as ICardProps;
      const contents: IItemTypeProps[] =
        targetCard.contents as IItemTypeProps[];
      const filteredContents: IItemTypeProps[] = contents.filter(
        (item: IItemTypeProps) => item.id !== action.payload.contentId,
      );
      targetCard.contents = filteredContents;
    },

    /**
     * 설문 종류가 선택형(객관식 질문, 체크박스)일 때, 기타 항목을 추가하는 함수
     */
    addEtcItem: (state: ICardProps[], action: IActionProps) => {
      const contents: IItemTypeProps[] = state.find(
        (card: ICardProps) => card.id === action.payload.id,
      )?.contents as IItemTypeProps[];
      contents.push({ id: action.payload.contentId, isEtc: true });
    },

    /**
     * 해당 카드를 필수 항목으로 변경하는 함수
     */
    toggleIsRequired: (state: ICardProps[], action: IActionProps) => {
      const targetCard: ICardProps = state.find(
        (card: ICardProps) => card.id === action.payload.id,
      ) as ICardProps;

      targetCard.isRequired = !targetCard.isRequired;
    },

    /**
     * 카드 순서를 변경하는 함수
     */
    moveCard: (state: ICardProps[], action: IActionProps) => {
      const copiedState: ICardProps[] = [...state];
      const movingCard: ICardProps[] = copiedState.splice(
        Number(action.payload.fromIndex) + 1,
        1,
      );
      copiedState.splice(Number(action.payload.toIndex) + 1, 0, ...movingCard);
      return copiedState;
    },

    /**
     * 설문 종류가 선택형(객관식 질문, 체크박스)일 때, 항목 순서를 변경하는 함수
     */
    moveContent: (state: ICardProps[], action: IActionProps) => {
      const targetCard: ICardProps = state.find(
        (card: ICardProps) => card.id === action.payload.cardId,
      ) as ICardProps;
      const contents: IItemTypeProps[] =
        targetCard.contents as IItemTypeProps[];
      const tmp = contents.splice(Number(action.payload.fromIndex), 1);
      contents.splice(Number(action.payload.toIndex), 0, ...tmp);
    },
  },
});

export const {
  addCard,
  removeCard,
  copyCard,
  focus,
  typeChange,
  setTitle,
  setText,
  addSelectItem,
  removeSelectItem,
  addEtcItem,
  toggleIsRequired,
  moveCard,
  moveContent,
} = cardSlice.actions;

export default cardSlice.reducer;
