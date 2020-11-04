var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BBq4xdFDvhdBjoUnLI-m9fPJ6dlpSaaI4OzxcG3y_ogJ6TpihDxKBGc7849uHyBZWhOGeWSirNidyKrFvGdID_w",
   "privateKey": "Hwe1TooBe_H_l3sHPQnb-cAI5URy_gEuHGtNWkCbiac"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fcT9FKFfgZk:APA91bFuorBq3I95ruLkbz_Mz4DJnGmuDfM1lpng0stvFNUDR2Hzroo1BeOQEPOH3BF6eAREYn9hRaJpIZ-90m62z6RLnlXmii1AOaqKcfkNsuajDQJtNG-Xt7TuWQFRMMxOELauZuuw",
   "keys": {
       "p256dh": "BIU1emJvHlsa7rQzhthSJXqzKo/gYQ+/AVP/BhTnwkEmughufVsvsMKfLet8y46sctDQrf5+vRQHG8E8wkuJLVA=",
       "auth": "fUEUeI69g4hyt5Vz0x5Nyg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '878395689259',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);