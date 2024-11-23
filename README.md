# Allomeuble - Clean Architecture

## Architecture Overview

Le projet est structuré selon les principes de Clean Architecture :

### Couches
- **Core** : Entités et logique métier
  - `entities/` : Modèles de données
  - `repositories/` : Interfaces de dépôt
  - `usecases/` : Cas d'utilisation

- **Infrastructure** : Implémentations concrètes
  - `repositories/` : Implémentations des dépôts (mock, API)

- **Présentation** : Couche d'interface utilisateur
  - `redux/` : Slices et logique d'état
  - Composants React

### Principes
- Séparation des préoccupations
- Dépendances unidirectionnelles
- Testabilité
- Flexibilité

## Développement

### Ajout de nouvelles fonctionnalités
1. Créer les entités dans `core/entities/`
2. Définir les interfaces de repository
3. Implémenter les cas d'utilisation
4. Créer les implémentations de repository
5. Ajouter les slices Redux

### Environnements
- Développement : Utilise des mocks
- Production : Remplacer par des implémentations réelles

## TODO
- Implémenter des tests unitaires
- Ajouter des validations
- Créer des implémentations pour l'API PrestaShop
