var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BAJHQlTXvAXd1Je90CdlGBAdQwlkvVRC8UFIv0m1KJwgFXoBmf4b6peEH7uFFgZrKwNrRvxCGaVdRpkJfFBGGWQ",
   "privateKey": "K4SbyP6PkshW26kJgbSaKa5rAZU7YNRT7RHMeoV6qT4"
};
 
 
webPush.setVapidDetails(
   'mailto:cobadrian12@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fUKDZxg-gDk:APA91bEsQ04OgmfGpHdSV0uSAZ90njiMyE9wccNIPNT8nGhBkOEjIOEfLRBUWncrUidV9ybDEU_TGakwdMLj5BBZdpcsHSizv61em8GDurMcild83UF45Y14EVkGdGLFvdVeUibDUAQ-",
   "keys": {
       "p256dh": "BDCyW4geCO9AUl7omy6UnEuVWxJNT2lWUrWsz4Of8CFV3zwnrU1bzlIOMmP4McnzHOSy0WJLIVgoyqy1KaNPROc=",
       "auth": "mpkAGndCpjZ/h6jo0xtZZg=="
   }
};


  var payload = `Selamat! Anda Berhasil Menambahkan sebagai Team Anda, Ayo dukung team anda`;

 
var options = {
   gcmAPIKey: '878395689259',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
