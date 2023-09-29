export const REFRIGERATOR_USER = {
  AUTHORITY: {
    ADMIN: 'admin',
    MANAGER: 'manager',
    NORMAL: 'normal',
    WAITING: 'waiting',
  },
};

export const REFRIGERATOR_SPACE = {
  SHAPE_TYPE: {
    SHELF: 'shelf',
    DRAWER: 'drawer',
    DOOR: 'door',
  },
  PURPOSE_TYPE: {
    REFRIGERATION: 'refrigeration',
    FREEZE: 'freeze',
    KIMCHI: 'kimchi',
  },
};

export const ITEM = {
  STATUS: {
    STORAGE: 'storage',
    USED: 'used',
    DISCARDED: 'discarded',
    // EXPIRED: "expired", // P_TODO: expired는 그냥 itemInfo의 날짜로 계산하자.
  },
};
