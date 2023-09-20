import uuid from 'react-native-uuid';

/**
 * 새로운 uuid를 생성하는 함수
 *
 * @returns {string} 랜덤 uuid
 */
export const getRandomId = (): string => String(uuid.v4());
