# Teksten en foto's op de site aanpassen

De site heeft een beheeromgeving (CMS) waarmee je zelf teksten, foto's, het menu en vacatures kunt aanpassen. Je hebt er alleen een **GitHub-account** voor nodig (eenmalig aangemaakt en uitgenodigd, zie onderaan).

## Inloggen

1. Ga naar **jouw site-URL + `/admin/`** (bijv. `https://www.pimentcatering.nl/admin/`).
2. Klik op **"Sign in with GitHub"**.
3. Log in met je GitHub-account en klik op **"Authorize"** als daarom wordt gevraagd.

## Iets aanpassen

1. Kies links een onderdeel:
   - **Pagina's** — de teksten van Home, Lunchcafé, Catering, Evenementen, Agenda, Over Piment, Contact
   - **Site-instellingen** — logo, adres, openingstijden, telefoonnummer
   - **Menu**, **Vacatures** en **Agenda**
2. Klik op de pagina die je wilt bewerken en pas de velden aan.
   - De meeste velden hebben een **Nederlands** en een **English** vakje: vul allebei in.
   - In de **Hero — titel** van de homepage kun je een paar woorden tussen sterretjes zetten, bijvoorbeeld `*in het groen*`. Die woorden komen dan schuin en in het groen op de site.
3. Klik rechtsboven op **Save** en daarna op **Publish**.

Na het publiceren bouwt de site zichzelf opnieuw. **Na 1 à 2 minuten** staat je wijziging live. Even je browser verversen (Cmd+R / F5) als je het nog niet ziet.

## Evenementen in de agenda zetten

De site heeft twee pagina's voor evenementen:

- **Agenda** (`/agenda/`): wat er binnenkort bij Piment te doen is, zoals workshops.
- **Evenementen** (`/evenementen/`): informatie over het huren van de locatie voor je eigen feest of zakelijke bijeenkomst, met onderaan de afgelopen evenementen.

Een nieuw evenement zet je erop via **Agenda** in het menu links van het CMS:

1. Klik op **Agenda** en dan op **Nieuw** (of **New**).
2. Vul de **datum** in, eventueel de **tijd**, de **titel** en de **omschrijving**. Een foto is optioneel.
3. Klik op **Save** en **Publish**.

Het evenement verschijnt op de agendapagina, met de eerstvolgende datum bovenaan. Het eerstvolgende evenement staat ook in een blok op de homepage, onder de grote foto. Is de datum voorbij, dan verdwijnt het vanzelf van de agenda en komt het bij **Afgelopen evenementen** op de evenementenpagina (de laatste zes, met foto). Laat het dus gerust in het CMS staan. Staat er niets op de agenda, dan ziet de agendapagina een korte melding; die tekst pas je aan bij **Pagina's → Agenda**.

Is er bij een evenement ook eten, zet dan **Knop 'Aanmelden eten' tonen** aan. Er komt dan een tweede knop die een mail stuurt met "Aanmelden eten" en de datum in het onderwerp. Geef de gewone knop dan bijvoorbeeld de tekst "Aanmelden workshop", zodat het verschil duidelijk is.

### Een workshopavond met meerdere makers

Voor een avond zoals "Doe het lekker zelf" maak je één evenement voor de avond zelf:

- Vul bij **Eten — tijd** de tijd in (bv. 17.30), met prijs en een korte uitleg, en zet **Knop 'Aanmelden eten' tonen** aan. Het eten krijgt dan een eigen blok met aanmeldknop, voor alle bezoekers van de avond.
- Vul onder **Programma** de tijden van de **Rondes** in, en per **Maker** de workshops: naam, ronde en de link naar de website van de maker. Een workshop van Piment zelf geef je als link het eigen evenement (bv. `/agenda/#workshop-vegetarische-kimchi`) en als ronde **Hele avond**.
- Zet **Knop 'Aanmelden per mail' tonen** uit, want voor de workshops meld je je aan bij de makers.

Piments eigen workshop zet je er als los evenement onder, zoals de kimchi-workshop. Die kaart krijgt vanzelf een linkje "Onderdeel van …" terug naar de avond.

### Links om te delen

**Aanmelden voor het eten:** `https://pimentcatering.nl/eten` stuurt bezoekers direct naar de aanmeldknop voor het eten van de eerstvolgende avond met eten. Deze korte link is handig voor de websites van de andere makers, in mails en op flyers, en blijft ook bij een volgende avond werken.

**Een bepaald evenement:** elk evenement heeft ook een eigen link: het adres van de agenda met `#` en de naam van het evenement erachter, met streepjes in plaats van spaties.

- `https://pimentcatering.nl/agenda/#doe-het-lekker-zelf` springt naar de workshopavond.
- Met `-eten` erachter (`…/agenda/#doe-het-lekker-zelf-eten`) springt de pagina naar de knop voor het eten van die avond, die dan even oplicht.

De naam in de link is de titel zoals je die bij het aanmaken invulde. Pas je de titel later aan, dan blijft de link hetzelfde. Oudere links naar `/evenementen/#…` (van voor de agendapagina) sturen vanzelf door naar de agenda.

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
