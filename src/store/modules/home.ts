import { defineStore } from 'pinia';
import { store } from '/@/store';

// 传统写法
// export const useHomeStore = defineStore({
//   // id: 'app-home',
//   state: (): HomeState => ({ count: 0 }),

//   getters: {
//     getInfo() {},
//   },

//   actions: {
//     increment() {
//       this.count++;
//     },
//   },
// });

// function写法
export const useHomeStore = defineStore('home', () => {
  const count = ref(0);
  const increment = () => {
    count.value++;
    console.log();
  };

  return { count, increment };
});

// Need to be used outside the setup
export function useHomeStoreWithOut() {
  return useHomeStore(store);
}
