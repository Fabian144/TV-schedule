# Användning av AI i uppgiften

Jag använde ChatGPT och lite av DuckDuckGos inbyggda AI för att lära mig om hur man fetchar data på olika sätt och skillnaderna, hanteringen av fetchad data och hantering av arrayer och objekt.

**Delarna av koden som jag använde AI till:**

- Fetch genom try, catch och await i en async funktion
- Att man kan använda det fetchade datat (t.ex. i en ny funktion) med .then efter att ha kallat på async funktionen
- Mappa arrayer med objekt för att modifiera, lägga till eller ta bort nycklar eller värden

**Implementeringen och värdering:**

ChatGPT föreslog att jag använder map() för arrayen med fetchade programmen, för att jag ville ha värdet för tiden då programmen startar som ett faktiskt datum (new Date()) istället för en sträng. Med map funktionen kan man enkelt modifiera varje nyckel i objekt i en array, i det här fallet för starttiden.

Då undrade jag hur man gör om man vill ha med alla nyckelvärdepar i map funktionen, i koden väljer jag bara ut två av dem, för att det tredje  (program beskrivningen) ändå inte används på något sätt. Det jag blev osäker på var om map funktionen alls var bra att använda om man har många nyckelvärdepar i objekten istället för bara tre som i det här fallet. Då lärde jag mig om spread operator, som används om man vill "kalla på" en array eller alla nyckelvärdepar i ett objekt, genom att bara skriva namnet på variabeln som arrayen eller objektet är kopplat till med tre punkter framför. På så sätt har jag just nu med alla nyckelvärdepar i program objekten för bättre skalbarhet, genom att använda "...program" i map funktionen men kan på samma gång lägga till, ta bort eller modifiera specifika nyckelvärdepar.
