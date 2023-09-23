import type {
  BottomTabNavigationProp as NavigationBottomTabNavigationProp,
  BottomTabScreenProps as NavigationBottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import type {
  CompositeNavigationProp as NavigationCompositeNavigationProp,
  CompositeScreenProps as NavigationCompositeScreenProps,
} from '@react-navigation/core';
import { ParamListBase } from '@react-navigation/native';
import type {
  StackScreenProps as NavigationStackScreenProps,
  StackNavigationProp,
} from '@react-navigation/stack';

import { BottomTabParamList } from '../tab/bottomtab/types/bottom-tab-param-list';

export type StackScreenProps<T extends ParamListBase> =
  NavigationStackScreenProps<T, keyof T>;

export type CompositeScreenProps<
  T extends ParamListBase,
  K extends string,
> = NavigationCompositeScreenProps<
  NavigationBottomTabScreenProps<T, K>,
  StackScreenProps<T>
>;
export type BottomTabNavigationProp<
  T extends keyof BottomTabParamList | undefined = undefined,
> = T extends keyof BottomTabParamList
  ? NavigationBottomTabNavigationProp<BottomTabParamList, T>
  : NavigationBottomTabNavigationProp<BottomTabParamList>;

export type GenBottomTabNavigationProp<
  T extends keyof BottomTabParamList | undefined = undefined,
> = T extends keyof BottomTabParamList
  ? NavigationBottomTabScreenProps<BottomTabParamList, T>
  : NavigationBottomTabScreenProps<BottomTabParamList>;

export type GenCompositeNavigationProp<
  B extends keyof BottomTabParamList,
  T extends ParamListBase,
> = NavigationCompositeNavigationProp<
  BottomTabNavigationProp<B>,
  StackNavigationProp<T, keyof T>
>;
