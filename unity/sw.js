// 공격 알림만 받는 서비스 워커 (페이지 저장·캐시는 안 함)
self.addEventListener("push", (e) => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (_) { d = { body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "공책전쟁", { body: d.body || "", icon: "icon-192.png", badge: "icon-192.png", tag: d.tag || "raid", renotify: true }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then((ws) => { for (const w of ws) if ("focus" in w) return w.focus(); return clients.openWindow("./"); }));
});
