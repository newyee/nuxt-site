// export default defineNuxtRouteMiddleware((to, from) => {
//   if (process.server) return;
//   const nuxtApp = useNuxtApp();
//   // console.log(nuxtApp.$i18n.locale.value);
//   let redirectPath = to.path.endsWith('/') ? to.path.slice(0, -1) : to.path;
//   console.log(redirectPath);
//   if (redirectPath.startsWith('/en')) {
//     nuxtApp.$i18n.locale.value = 'en';
//   } else if (redirectPath.startsWith('/ja')) {
//     nuxtApp.$i18n.locale.value = 'ja';
//     console.log('nuxtApp.$i18n.locale.value', nuxtApp.$i18n.locale.value);
//   }

//   switch (redirectPath) {
//     case '':
//       return navigateTo(redirectPath + '/ja', {
//         replace: true,
//       });
//       break;
//   }
// });
