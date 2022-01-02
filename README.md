# Médoc

Médoc est une application qui permet de rechercher un médicament à l'aide de son code-barre (code CIP) ou via son nom.

L'application n'utilise aucun serveur pour pouvoir récupérer les données publiques. Celle-ci, au démarrage, télécharge l'entièreté de la [base de données publique des médicaments](http://base-donnees-publique.medicaments.gouv.fr/) provenant du [Ministère de la Santé](https://solidarites-sante.gouv.fr/), et la stocke dans un fichier local.

## Installation

```sh
yarn # installation des dépendances
yarn android # lancement de l'application sur android
```
