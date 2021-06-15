export default function({store, redirect, route}) {
  if (route.path !== '/') {
    store.commit('checkAuth');
    store.commit("checkAdmin");
    let role = store.state.user.admin;
    let au = store.state.user.authenticated;
    console.log(role, au);
    if (role === true) {
      return redirect('/Teacher')
    }
    else {

    }
  }
}
