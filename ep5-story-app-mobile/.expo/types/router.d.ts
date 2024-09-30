/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/createStory` | `/(tabs)/explore` | `/(tabs)/storyDetail` | `/(tabs)/storyListing` | `/_sitemap` | `/createStory` | `/explore` | `/storyDetail` | `/storyListing` | `/types/Story`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
