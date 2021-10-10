import * as types from './stock-types';
import events from '../../../plugins/events';
import router from '../../../routes';
import interceptor from '../../../plugins/interceptor';

const state = {
  stock: null,
  allStocks: [],
};

const getters = {
  [types.GET_SINGLE_STOCK]: state => {
    return state.stock;
  },
  [types.GET_ALL_STOCKS]: state => {
    return state.allStocks;
  },
};

const mutations = {
  [types.SET_SINGLE_STOCK]: (state, payload) => {
    state.stock = payload;
  },
  [types.SET_ALL_STOCKS]: (state, payload) => {
    state.allStocks = payload;
  },
};

const actions = {
  // Get a single stock  
  [types.GET_SINGLE_STOCK_ACTION]: ({commit}, id) => {
    let url = `stock/${id}`;
    interceptor.get(url)
      .then((response) => {
        commit(types.SET_SINGLE_STOCK, response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // Get all stocks
  [types.GET_ALL_STOCKS_ACTION]: ({commit}) => {
    let url = 'stock';
    interceptor.get(url)
      .then((response) => {
        commit(types.SET_ALL_STOCKS, response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // Add a stock action
  [types.ADD_STOCK_ACTION]: ({commit}, payload) => {
    let url = 'stock';
    interceptor.post(url, payload)
      .then((response) => {
        if (response) {
          events.emit('add_toast', {
            content: 'Stock added successfully',
            type: 'success',
          });
          router.push({ name: 'StockList' });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // Update a stock action
  [types.UPDATE_STOCK_ACTION]: ({commit}, payload) => {
    let url = `stock/update/${payload.id}`;
    interceptor.put(url, payload.data)
      .then((response) => {
       if (response) {
        events.emit('add_toast', {
          content: 'Stock updated successfully',
          type: 'success',
        });
        router.push({ name: 'StockList' });
       }
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // Delete a stock action
  [types.DELETE_STOCK_ACTION]: ({commit}, id) => {
    let url = `stock/delete/${id}`;
    interceptor.delete(url)
      .then((response) => {
        if (response) {
          events.emit('add_toast', {
            content: 'Stock deleted successfully',
            type: 'success',
          });
          router.push({ name: 'StockList' });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // Add a stock comment action
  [types.ADD_COMMENT_ACTION]: ({commit}, payload) => {
    let url = `stock/${payload.id}/comment`;
    interceptor.post(url, payload.data)
      .then((response) => {
        if (response) {
          commit(types.SET_SINGLE_STOCK, response.data);
          events.emit('add_toast', {
            content: 'Comment added to stock',
            type: 'success',
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // Delete a stock comment action
  [types.DELETE_COMMENT_ACTION]: ({commit}, payload) => {
    let url = `stock/${payload.id}/comment/${payload.commentId}`;
    interceptor.delete(url)
      .then((response) => {
        if (response) {
          commit(types.SET_SINGLE_STOCK, response.data);
          events.emit('add_toast', {
            content: 'Comment deleted from stock',
            type: 'success',
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // Update a stock comment action
  [types.UPDATE_COMMENT_ACTION]: ({commit}, payload) => {
    let url = `stock/${payload.id}/comment/edit/${payload.commentId}`;
    interceptor.put(url, { commentText: payload.text })
      .then((response) => {
        if (response) {
          commit(types.SET_SINGLE_STOCK, response.data);
          events.emit('add_toast', {
            content: 'Comment updated from stock',
            type: 'success',
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}