import {Alert} from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

export const useCamera = () => {
  const requestCameraPermissions = () => {
    return new Promise((resolve, reject) => {
      request(PERMISSIONS.ANDROID.CAMERA)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              Alert.alert('Fonctionnalités non disponible');
              reject();
              break;
            case RESULTS.DENIED:
              generateAlert(
                "Permission d'accès refusée",
                'Vous devez autoriser Médoc à accéder à votre caméra pour pouvoir utiliser cette fonctionnalité.',
              );
              reject();
              break;
            case RESULTS.LIMITED:
              generateAlert(
                'Permission limitée',
                'Vous devez autoriser Médoc à accéder à votre caméra pour pouvoir utiliser cette fonctionnalité.',
              );
              reject();
              break;
            case RESULTS.BLOCKED:
              generateAlert(
                "Permission d'accès refusée",
                'Vous devez autoriser Médoc à accéder à votre caméra pour pouvoir utiliser cette fonctionnalité.',
              );
              reject();
              break;
            case RESULTS.GRANTED:
              resolve(true);
              break;
          }
        })
        .catch(() => {
          generateAlert(
            "Autoriser l'accès à la caméra",
            'Vous devez autoriser Médoc à accéder à votre caméra pour pouvoir utiliser cette fonctionnalité.',
          );
          reject();
        });
    });
  };

  const generateAlert = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'Ouvrir mes paramètres', onPress: () => openSettings()},
        {text: 'Annuler', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  return {requestCameraPermissions};
};
