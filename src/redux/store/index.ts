import { configureStore, createSlice } from '@reduxjs/toolkit';
import { getRandomId } from '@utils/getRandomId';

export const inputTypes = {
  TITLE: 'TITLE',
  TEXT: 'TEXT',
  TEXTAREA: 'TEXTAREA',
  RADIO: 'RADIO',
  CHECKBOX: 'CHECKBOX',
};
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

export interface IStateProps {
  cards: ICardProps[];
}

interface IPayloadProps {
  [key: string]: string;
}

interface IActionProps {
  type: string;
  payload: IPayloadProps;
}

const sortEtcItem = (currentContents: IItemTypeProps[]) => {
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

// 필수 설정 관련 리듀서
const requiredSlice = createSlice({
  name: 'required',
  initialState: '',
  reducers: {
    setRequiredCardId: (_, action: IActionProps) => {
      action.payload.cardId;
    },
    removeRequiredCardId: () => '',
  },
});

// 카드 CRUD 관련 리듀서
const cardSlice = createSlice({
  name: 'reducer',
  initialState: [...initialCard] as ICardProps[],
  reducers: {
    // 새 카드 추가
    addCard: (state: ICardProps[], action: IActionProps) => {
      const copiedState: ICardProps[] = state.map((card: ICardProps) => ({
        ...card,
        isFocused: false,
      }));

      copiedState.push(createNewCard(action.payload.cardId));
      return copiedState;
    },
    // 카드 재거
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
    // 카드 복사
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
    // 해당 카드 포커스
    focus: (state: ICardProps[], action: IActionProps) => {
      const copiedState: ICardProps[] = state.map((card: ICardProps) =>
        action.payload.id === card.id
          ? { ...card, isFocused: true }
          : { ...card, isFocused: false },
      );
      return copiedState;
    },
    // 설문 종류 변경
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
    // 타이틀 입력
    setTitle: (state: ICardProps[], action: IActionProps) => {
      const targetCard: ICardProps = state.find(
        (card: ICardProps) => card.id === action.payload.cardId,
      ) as ICardProps;
      targetCard.cardTitle = action.payload.title;
    },
    // 설명 입력
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
    // 선택 보기 추가
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
    // 선택 보기 제거
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
    // 선택 중 기타 보기 추가
    addEtcItem: (state: ICardProps[], action: IActionProps) => {
      const contents: IItemTypeProps[] = state.find(
        (card: ICardProps) => card.id === action.payload.id,
      )?.contents as IItemTypeProps[];
      contents.push({ id: action.payload.contentId, isEtc: true });
    },
    // 필수 설정
    toggleIsRequired: (state: ICardProps[], action: IActionProps) => {
      const targetCard: ICardProps = state.find(
        (card: ICardProps) => card.id === action.payload.id,
      ) as ICardProps;

      targetCard.isRequired = !targetCard.isRequired;
    },
  },
});

// store 생성
const store = configureStore({
  reducer: {
    cards: cardSlice.reducer,
    required: requiredSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

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
} = cardSlice.actions;
export const { setRequiredCardId, removeRequiredCardId } =
  requiredSlice.actions;

export default store;
