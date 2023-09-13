import uuid from 'react-native-uuid';

export const getRandomId = (): string => String(uuid.v4());
