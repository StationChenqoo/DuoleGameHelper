import {RootStacksParams} from '@root/PageStacks';
import {ImageRequireSource, ImageURISource} from 'react-native';

export interface Player {
  id: number;
  name: string;
  /** 进贡、吃贡、出的牌 */
  handleCards: string[];
}

export interface Game {
  src: ImageRequireSource | ImageURISource;
  title: string;
  message: string;
  page: keyof RootStacksParams;
}
