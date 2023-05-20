export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequests(state, load) {
    state.requests = load;
  }
};