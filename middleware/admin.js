export default function ({store, redirect, $auth}) {
  store.commit("checkAdmin");
  if ($auth.$storage.loggedIn && store.state.admin) {
    return redirect('/Teacher')
  }
};
