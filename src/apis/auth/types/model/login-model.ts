import { TokenType } from '@/utils/async-storage/token';

export interface LoginModel extends TokenType {
  user: {
    id: number;
    provider: 'google.com';
    userLoginId: 'test@gmail.com';
  };
}
