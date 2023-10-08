export const REFRIGERATOR_USER = {
  AUTHORITY: {
    ADMIN: 'admin',
    MANAGER: 'manager',
    NORMAL: 'normal',
    WAITING: 'waiting',
  },
};
export const REFRIGERATOR = {
  STATUS: {
    OPERATION: 'operation',
    WAIT_FOR_DELETION: 'wait_for_deletion',
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

export const IMAGE_URL_LIST = [
  {
    name: 'salad',
    uri: 'https://drive.google.com/uc?export=view&id=1ZTbeenhvVWWAGXtSFYfxIf8ofKOtr9Yl',
  },
  {
    name: 'rice',
    uri: 'https://drive.google.com/uc?export=view&id=1ViMkJxNo487YaeeC0CiHAghzSzARoC3Z',
  },
  {
    name: 'chicken',
    uri: 'https://drive.google.com/uc?export=view&id=1WqQHjEbo8w4qSRfJhZEnRj2qP0n_UEKG',
  },
  {
    name: 'drink',
    uri: 'https://drive.google.com/uc?export=view&id=1D9tlt5JdJqala4Vib2Htr7mQ4XIrjfP5',
  },
  {
    name: 'cookie',
    uri: 'https://drive.google.com/uc?export=view&id=1yhYWsGhAV8Iprgacp6TImL73Zoiq4dz2',
  },
];
