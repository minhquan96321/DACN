// importScripts("https://cdn.pushalert.co/sw-78204_7.js");
self.addEventListener('push', (event) => {
    const data = event.data.json();
    console.log('Push received:', data);
    const options = {
        body: data.body,
        icon: '/notification.jpg',
        badge: '/notification.jpg',
        actions: data.actions || [],
        data: data.data || {},
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data?.url || '/';
    event.waitUntil(clients.openWindow(url));
});
