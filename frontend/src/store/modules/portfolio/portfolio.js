import * as types from './portfolio-types';
import events from '../../../plugins/events';
import router from '../../../routes';
import interceptor from '../../../plugins/interceptor';

const state = {
  portfolio: null,
  allPortfolios: [],
};

const getters = {
  [types.GET_SINGLE_PORTFOLIO]: state => {
    return state.portfolio;
  },
  [types.GET_ALL_PORTFOLIOS]: state => {
    return state.allPortfolios;
  },
};

const mutations = {
  [types.SET_SINGLE_PORTFOLIO]: (state, payload) => {
    state.portfolio = payload;
  },
  [types.SET_ALL_PORTFOLIOS]: (state, payload) => {
    state.allPortfolios = payload;
  },
};

const actions = {
  // Get a single portfolio  
  [types.GET_SINGLE_PORTFOLIO_ACTION]: ({commit}, id) => {
    let url = `portfolio/${id}`;
    interceptor.get(url)
      .then((response) => {
        commit(types.SET_SINGLE_PORTFOLIO, response);
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // Get all portfolios
  [types.GET_ALL_PORTFOLIOS_ACTION]: ({commit}) => {
    let url = 'portfolio';
    interceptor.get(url)
      .then((response) => {
        commit(types.SET_ALL_PORTFOLIOS, response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // Create a portfolio action
  [types.CREATE_PORTFOLIO_ACTION]: ({commit}, payload) => {
    let url = 'portfolio';
    interceptor.post(url, payload)
      .then((response) => {
        if (response) {
          events.emit('add_toast', {
            content: 'Portfolio created successfully',
            type: 'success',
          });
          router.push({ name: 'Portfolio' });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // Update a portfolio action
  [types.UPDATE_PORTFOLIO_ACTION]: ({commit}, payload) => {
    let url = `portfolio/update/${payload.id}`;
    interceptor.put(url, payload.data)
      .then((response) => {
       if (response) {
        commit(types.SET_SINGLE_PORTFOLIO, response);
        events.emit('add_toast', {
          content: 'Portfolio updated successfully',
          type: 'success',
        });
        router.push({ name: 'Portfolio' });
       }
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // Delete a portfolio action
  [types.DELETE_PORTFOLIO_ACTION]: ({commit}, id) => {
    let url = `portfolio/delete/${id}`;
    interceptor.delete(url)
      .then((response) => {
        if (response) {
          events.emit('add_toast', {
            content: 'Portfolio deleted successfully',
            type: 'success',
          });
          router.push({ name: 'Portfolio' });
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