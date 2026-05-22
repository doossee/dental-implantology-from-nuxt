import { ALERT_MESSAGES } from '@/constants'

export default defineNuxtPlugin({
  enforce: "pre",
  setup() {
    const clients = useRuntimeConfig().public.openFetch;
    const localFetch = useRequestFetch();

    let isRefreshing = false;
    let refreshPromise: Promise<void> | null = null;

    return {
      provide: Object.entries(clients).reduce(
        (acc, [name, options]) => ({
          ...acc,

          [name]: createOpenFetch((localOptions) => {
              // const { pushAlert } = useAlert();
              // const removeData = useRemoveAuthData();
              // const accessToken = useAuthAccessToken();
              // const refreshToken = useAuthRefreshToken();
              // let isRefreshing = false;
              // let refreshPromise: Promise<void> | null = null;

              // return {
              //   ...options,
              //   ...localOptions,
              //   headers: {
              //     ...localOptions.headers,
              //     ...(accessToken.value ? { Authorization: 'Bearer ' + accessToken.value } : {}),
              //   },
              //   async onResponseError(ctx) {
              //     if (ctx.response?.status === 403 && import.meta.client) {
              //       pushAlert(ALERT_MESSAGES.ACCESS_DENIED, 'WARNING');
              //     }

              //     if (ctx.response?.status === 500 && import.meta.client) {
              //       pushAlert(ALERT_MESSAGES.SERVER_ERROR, 'WARNING');
              //       return;
              //     }

              //     if (ctx.response?.status === 400 && import.meta.client) {
              //       const { message }: { message?: string[] } = ctx.response._data;
              //       if (!message) return;
              //       message.forEach(m => pushAlert(m, 'WARNING'));
              //     }

              //     // Handle Unauthorized (401)
              //     if (ctx.response?.status === 401) {
              //       if (!accessToken.value || !refreshToken.value) {
              //         removeData();
              //         return;
              //       }

              //       try {
              //         if (!isRefreshing) {
              //           isRefreshing = true;
              //           refreshPromise = fetch(clients.api.baseURL + '/auth/refresh', {
              //             method: 'POST',
              //             headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken.value}` },
              //             body: JSON.stringify({ refreshToken: refreshToken.value }),
              //           })
              //             .then(async (res) => {
              //               if (!res.ok) throw new Error('Refresh failed');
              //               const data: { accessToken: string; refreshToken: string } = await res.json();
              //               accessToken.value = data.accessToken;
              //               refreshToken.value = data.refreshToken;
              //             })
              //             .catch(() => {
              //               removeData();
              //             })
              //             .finally(() => {
              //               isRefreshing = false;
              //               refreshPromise = null;
              //             });

              //           await refreshPromise;
              //         } else if (refreshPromise) {
              //           await refreshPromise;
              //         }

              //         // if (accessToken.value) {
              //         //   ctx.options.headers = {
              //         //     ...ctx.options.headers,
              //         //     Authorization: `Bearer ${accessToken.value}`,
              //         //   };
              //         //   return localFetch(ctx.request, ctx.options as any);
              //         // }
              //         if (ctx.options.headers instanceof Headers) {
              //           ctx.options.headers.set('Authorization', `Bearer ${accessToken.value}`);
              //         } else {
              //           ctx.options.headers = {
              //             ...ctx.options.headers as any,
              //             Authorization: `Bearer ${accessToken.value}`,
              //           };
              //         }
              //       } catch (error) {
              //         removeData();
              //       }
              //     }
              //   },
              // };

              const { pushAlert } = useAlert();
              const removeData = useRemoveAuthData();
              const accessToken = useAuthAccessToken();
              const refreshToken = useAuthRefreshToken();

              return {
                ...options,
                ...localOptions,
                headers: {
                  ...localOptions.headers,
                  ...(accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {}),
                },
                async onResponseError(ctx) {
                  const { status } = ctx.response || {};

                  if (status === 403 && import.meta.client) {
                    pushAlert(ALERT_MESSAGES.ACCESS_DENIED, 'WARNING');
                  }

                  if (status === 500 && import.meta.client) {
                    pushAlert(ALERT_MESSAGES.SERVER_ERROR, 'WARNING');
                    return;
                  }

                  if (status === 400 && import.meta.client) {
                    const { message }: { message?: string[] } = ctx.response._data;
                    if (!message) return;
                    message.forEach(m => pushAlert(m, 'WARNING'));
                  }

                  // === Обработка 401 (Unauthorized) ===
                  if (status === 401) {
                    if (!accessToken.value || !refreshToken.value) {
                      removeData();
                      return;
                    }

                    try {
                      if (!isRefreshing) {
                        isRefreshing = true;
                        refreshPromise = fetch(clients.api.baseURL + '/auth/refresh', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken.value}` },
                          body: JSON.stringify({ refreshToken: refreshToken.value }),
                        })
                          .then(async (res) => {
                            if (!res.ok) throw new Error('Refresh failed');
                            const data: { accessToken: string; refreshToken: string } = await res.json();
                            accessToken.value = data.accessToken;
                            refreshToken.value = data.refreshToken;
                          })
                          .catch(() => {
                            removeData();
                          })
                          .finally(() => {
                            isRefreshing = false;
                            refreshPromise = null;
                          });

                        await refreshPromise;
                      } else if (refreshPromise) {
                        await refreshPromise;
                      }

                      if (accessToken.value) {
                        // === Повторяем оригинальный запрос ===
                        if (ctx.options.headers instanceof Headers) {
                          ctx.options.headers.set('Authorization', `Bearer ${accessToken.value}`);
                        } else {
                          ctx.options.headers = {
                            ...ctx.options.headers as any,
                            Authorization: `Bearer ${accessToken.value}`,
                          };
                        }
                        return localFetch(ctx.request, ctx.options as any);
                      }
                    } catch (error) {
                      removeData();
                    }
                  }
                },
              };
            },
            localFetch
          ),
        }),
        {}
      ),
    };
  },
});
