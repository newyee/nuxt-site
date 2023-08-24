export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/' && !to.path.endsWith('/')) {
    const { path, query, hash } = to;
    const nextRoute = { path: path + '/', query, hash };
    console.log('nextRoute', nextRoute);
    return navigateTo(nextRoute, { redirectCode: 301 });
  }
});
// export default defineNuxtRouteMiddleware((to, from) => {
//   if (to.path !== '/' && to.path.endsWith('/')) {
//     const { path, query, hash } = to;
//     const nextPath = path.replace(/\/+$/, '') || '/';
//     const nextRoute = { path: nextPath, query, hash };
//     return navigateTo(nextRoute, { redirectCode: 301 });
//   }
// });
