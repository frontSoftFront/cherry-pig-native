import { Linking } from 'expo';
import { useLinking } from '@react-navigation/native';
// //////////////////////////////////////////////////

export default function linking(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          Home: 'home',
          Money: 'money',
          Feeding: 'feeding',
          Settings: 'settings',
          Resources: 'resources',
          Veterinary: 'veterinary',
        },
      },
    },
  });
}
