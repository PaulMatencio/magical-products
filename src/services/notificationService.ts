/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const notificationService = {
  async requestPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      console.warn("This browser does not support desktop notification");
      return false;
    }

    if (Notification.permission === "granted") {
      return true;
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }

    return false;
  },

  sendNotification(title: string, body: string, icon?: string) {
    console.log(`NotificationService: Attempting to send notification: "${title}"`, {
      permission: Notification.permission,
      browserSupport: "Notification" in window
    });

    if (Notification.permission === "granted") {
      const inIframe = window.self !== window.top;
      if (inIframe) {
        console.warn("NotificationService: Running inside an iframe. Notifications are likely blocked by the browser sandbox even if permission is granted. Please open the app in a NEW TAB.");
      }
      
      try {
        const n = new Notification(title, {
          body,
          icon: icon || "/vite.svg",
        });
        n.onclick = () => {
          window.focus();
          n.close();
        };
        console.log("NotificationService: Notification constructor called successfully");
      } catch (err) {
        console.error("NotificationService: Error creating notification object. This often happens in iframes.", err);
      }
    } else {
      console.warn(`NotificationService: Cannot send notification because permission is ${Notification.permission}`);
    }
  }
};
