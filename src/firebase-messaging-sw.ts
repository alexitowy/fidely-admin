import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { environment } from './environments/environment';

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const app = initializeApp(environment.firebase);
      const messaging = getMessaging(app);

      getToken(messaging, {
        vapidKey:
          'BMa-gscQzR_6SgkL5CJBy-TldoZoJ8hpO6FNKU00vVua0FaTRF8jnQSdio2JDDTFvfIRa6DBdtwDzSvQQFWg1yE',
      }).then((currentToken) => {
        if (currentToken) {
          console.log('currentToken', currentToken);
        } else {
          console.log('Can  ot get token');
        }
      });
    } else {
      console.log('dont have permissions');
    }
  });
}

requestPermission();
