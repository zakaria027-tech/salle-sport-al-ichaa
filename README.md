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
La page d’administration est un éditeur visuel : sélectionner la langue, puis cliquer directement sur un texte ou une image dans l’aperçu du site. Les textes peuvent être modifiés dans le panneau latéral. Les images peuvent être téléversées depuis l’appareil vers le bucket Supabase `site-media`. Les changements restent en brouillon jusqu’au clic sur « Publier les modifications ». Un sélecteur permet de basculer entre le thème sombre et le thème clair.

## Notes
- Les horaires sont volontairement indiqués comme à confirmer, aucune plage horaire non vérifiée n'est inventée.
- Les disciplines exactes, tarifs et planning détaillé ne sont pas préremplis car ils n'ont pas été confirmés par le club.
- Le thème clair/sombre et la langue du site sont enregistrés localement par visiteur.
