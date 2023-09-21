import { View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as S from './form.styles';
import { colors } from '@styles/theme';
import { IFormUI } from './form.types';
import Card from '@components/card';

import { ICardProps, inputTypes } from '@redux/reducer/types';

const FormUI = ({
  cards,
  onDragEnd,
  addNewCard,
  handleGoPreview,
}: IFormUI): JSX.Element => {
  const [cardTitle, ...cardsExceptTitle] = cards;

  const listHeader = (): JSX.Element => {
    return <Card isTitle={true} {...cardTitle} />;
  };

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<ICardProps>) => {
    return (
      <Card
        isTitle={item.inputType === inputTypes.TITLE}
        drag={drag}
        isActive={isActive}
        {...item}
      />
    );
  };

  return (
    <S.Wrapper>
      <DraggableFlatList
        data={cardsExceptTitle}
        contentContainerStyle={S.flatListStyles.container}
        containerStyle={{ flex: 1 }}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={listHeader}
        onDragEnd={onDragEnd}
        ListHeaderComponentStyle={{ marginBottom: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={renderItem}
      />
      <S.AddCardWrapper>
        <S.ShadowView elevation={4}>
          <S.AddCard activeOpacity={0.6} onPress={addNewCard}>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={26}
              color={colors.gray}
            />
            <S.AddCardLabel>추가하기</S.AddCardLabel>
          </S.AddCard>
        </S.ShadowView>
      </S.AddCardWrapper>
    </S.Wrapper>
  );
};

export default FormUI;
