import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认 localStorage
import reducers from '@/modules'

const persistConfig = {
  // 存储的 key
  key: 'root',
  // 存储方式 localStorage
  storage,
};

// 创建持久化 reducer
const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));

// 创建 Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 关闭序列化检查
    }),
});

// 创建 persistor
const persistor = persistStore(store);

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export {
  store,
  persistor
}

export default {
  store,
  persistor
}