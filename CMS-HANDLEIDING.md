# Teksten en foto's op de site aanpassen

De site heeft een beheeromgeving (CMS) waarmee je zelf teksten, foto's, het menu en vacatures kunt aanpassen. Je hebt er alleen een **GitHub-account** voor nodig (eenmalig aangemaakt en uitgenodigd, zie onderaan).

## Inloggen

1. Ga naar **jouw site-URL + `/admin/`** (bijv. `https://www.pimentcatering.nl/admin/`).
2. Klik op **"Sign in with GitHub"**.
3. Log in met je GitHub-account en klik op **"Authorize"** als daarom wordt gevraagd.

## Iets aanpassen

1. Kies links een onderdeel:
   - **Pagina's** — de teksten van Home, Lunchcafé, Catering, Over Piment, Contact
   - **Site-instellingen** — logo, adres, openingstijden, telefoonnummer
   - **Menu** en **Vacatures**
2. Klik op de pagina die je wilt bewerken en pas de velden aan.
   - De meeste velden hebben een **Nederlands** en een **English** vakje: vul allebei in.
3. Klik rechtsboven op **Save** en daarna op **Publish**.

Na het publiceren bouwt de site zichzelf opnieuw. **Na 1 à 2 minuten** staat je wijziging live. Even je browser verversen (Cmd+R / F5) als je het nog niet ziet.

## Foto's

- Nieuwe foto's upload je direct in een foto-veld of via **Media** in het menu.
- Gebruik het liefst niet te grote bestanden (max ~1 MB); grote foto's maken de site traag.
- Het **logo** (Site-instellingen → Algemeen) werkt het best als afbeelding met transparante achtergrond.

## Problemen?

- **Kan niet inloggen?** Controleer of je bij GitHub bent ingelogd met het juiste account. Wachtwoord vergeten regel je bij GitHub zelf ("Forgot password?" op github.com).
- **Wijziging niet zichtbaar?** Wacht 2 minuten en ververs de pagina. Nog niets? Neem contact op met Quinten.

---

## Eenmalige setup (voor de beheerder, niet voor de eigenaar)

1. **GitHub OAuth App aanmaken** (github.com → Settings → Developer settings → OAuth Apps → New OAuth App):
   - Homepage URL: de site-URL
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. **Netlify koppelen**: Netlify → site → Site configuration → Access & security → **OAuth** → Install provider → GitHub → Client ID + Secret van stap 1 invullen.
3. **Eigenaar uitnodigen**: GitHub-repo `Quintennnn/piment_catering` → Settings → Collaborators → invite met **Write**-toegang. De eigenaar maakt zo nodig eerst een gratis GitHub-account aan en accepteert de uitnodiging via de mail.
