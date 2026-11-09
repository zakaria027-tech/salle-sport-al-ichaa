# Salle de Sport El-ichaa

Site vitrine statique (GitHub Pages) avec contenu chargé depuis Supabase et une page d'administration indépendante.

## Fichiers
- `index.html`: site public.
- `admin.html`: panneau d'administration indépendant, sans lien depuis le site public.
- `config.js`: URL Supabase et clé publishable (clé publique, protégée par RLS).
- `supabase-setup.sql`: tables, politiques RLS et bucket de médias.
- `.github/workflows/pages.yml`: publication automatique GitHub Pages.

## 1. Configurer Supabase
1. Ouvrir le projet Supabase : https://supabase.com/dashboard/project/dkafvmtnikzktaphkows
2. Ouvrir SQL Editor, coller le contenu de `supabase-setup.sql`, puis exécuter.
3. Dans Authentication > Users, créer un utilisateur administrateur avec une adresse e-mail et un mot de passe robuste.
4. Copier son UUID, puis dans SQL Editor exécuter :
   `insert into public.site_admins (user_id) values ('UUID_DE_L_ADMIN');`
5. Ne jamais partager ni publier une service_role/secret key. La clé publishable intégrée au navigateur est publique par conception; la sécurité repose sur RLS et la liste d'administrateurs.

## 2. Publication
Le workflow GitHub Actions publie le contenu du dépôt sur GitHub Pages à chaque push sur `main`.
Dans GitHub, ouvrir Settings > Pages et vérifier que la source est **GitHub Actions**.
Une fois le workflow terminé, le site sera disponible à :
https://zakaria027-tech.github.io/salle-sport-al-ichaa/

La page d'administration sera disponible à :
https://zakaria027-tech.github.io/salle-sport-al-ichaa/admin.html
Elle n'est liée nulle part depuis le site public. Garder l'URL privée; la vraie protection reste l'authentification Supabase et les politiques RLS.

## 3. Éditer le contenu
Se connecter à la page admin avec le compte créé dans Supabase Auth. L'éditeur accepte l'objet JSON complet du site. Les textes traduits se trouvent dans `translations.fr`, `translations.ar` et `translations.en`; les images dans `images`; les avis dans `reviews`; les coordonnées dans `contact`.
Pour publier, cliquer sur « Enregistrer et publier ».

## Notes
- Les horaires sont volontairement indiqués comme à confirmer, aucune plage horaire non vérifiée n'est inventée.
- Les disciplines exactes, tarifs et planning détaillé ne sont pas préremplis car ils n'ont pas été confirmés par le club.
- Le panneau actuel permet l'édition de tout le JSON et la publication sécurisée. L'upload graphique direct d'images depuis le navigateur est une amélioration à réaliser séparément; les URLs d'images publiques fonctionnent déjà.
- Le thème clair/sombre et la langue sont enregistrés localement par visiteur.
