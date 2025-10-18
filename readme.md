
# To-Do Lista
Web-sovellus yksinkertaisen tehtävälistan tekemiseen.

## Ominaisuudet
Sovelluksella käyttäjä voi lisätä tehtäviä listaan joko painamalla erillistä nappia tai enteriä. Listalla olevat tehtävät voi merkitä tehdyksi valintalaatikoita klikkaamalla. 

Sovellus tarkistaa käyttäjän syötteen ennen lisäystä (Täytyy olla vähintään kolme merkkiä)

Tehtävät tallennetaan localstorageen ja sovellus lataa ne automaattisesti käynnistäessä.

Tehtäviä voi poistaa listasta joko tyhjentämällä koko listan tai painamalla nappia, joka poistaa vain valitut tehtävät.

## Sovelluksessa käytetään:
- Javascript (DOM)
- CSS
- HTML


## Vaatimukset sovellukselle:

- Vain "natiivi" JavaScriptiä, ei käytetä ulkoisia kirjastoja  (JQuery tms.)
- Sovelluksessa on käytetty DOM skriptausta ja lomakkeita 
- Sovelluksen lähdekoodi on julkaistu GitHubissa. Luo tätä varten uusi tyhjä repository. 
- Sovellus on julkaistu Netlify palvelussa.  (HUOM. HTML-sivun nimen tulee olla index.html)
- Kenttään syötetyt asiat kootaan nappia painamalla sivulla yhteen listaksi.  
- Syöttökenttien sisältö tulee tarkistaa tyhjän sekä virheellisen (esim. liian lyhyen) sisällön varalta
- Virheellinen sisältö syöttökentässä saa aikaan virheilmoituksen sekä virheellisen kentän korostuksen (esim. punainen reuna).
- Listasta tulee olla mahdollisuus poistaa elementtejä sekä merkitä tehtävä hoidetuksi
- Sovelluksen CSS- ja JavaScript-koodi tulee olla määritelty ulkoisessa tiedostossa (.css ja .js)
- Listan tiedot tallennetaan selaimeen, esim. localstorageen (jos ehditty käydä yhdessä läpi)

Lisätoimintoja:

- Voit käyttää myös alasvetovalikoita ja valintalaatikoita
- Voit toteuttaa laskurin, joka osoittaa listalla auki olevien asioiden määrän
- Yritä keksiä jokin mielekäs tapa piilottaa ja näyttää elementtejä sovelluksessa. 
- Voit halutessasi käyttää myös HTML5:n drag&drop toiminnallisuutta listassa
- Voit toteuttaa (kuvassakin alareunassa näkyvät) napit, joilla näkyviin saa vain aktiiviset tai tehdyt tehtävät
- Voit myös käyttää esim. Bootstrapia ulkoasun muokkaamiseen

