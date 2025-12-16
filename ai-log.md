# Hur och var jag använde AI i uppgiften

## Del 1

Jag använde ChatGPT och lite av DuckDuckGos inbyggda AI för att lära mig vissa saker innan vi fick uppgiften, om hur man fetchar data på olika sätt och skillnaderna, hanteringen av fetchad data och hantering av arrayer. Det jag lärde mig har jag sedan använt till vissa delar av koden.

### Delarna av koden som jag lärde mig skriva med hjälp av AI

- Fetch genom try, catch och await i en async funktion
- Att man kan använda det fetchade datat (t.ex. i en ny funktion) med .then efter att ha kallat på async funktionen
- Mappa arrayer för att modifiera, lägga till eller ta bort nyckelvärdepar

### Implementeringen och värdering

ChatGPT föreslog att jag använder map() för arrayen med fetchade datat för att kunna spara dem i en variabel och använda datat utifrån den. Det var för att jag ville ha värdet för tiden då programmet startar som ett faktiskt datum (new Date()) istället för en sträng, då kan man enkelt modifiera varje "start" nyckel på det sättet.

Då undrade jag hur man gör om man vill ha med alla nyckelvärdepar, i koden väljer jag bara ut två av dem (rad 114-117), för att det tredje ändå inte behöver visas upp. Det jag blev osäker på var om det här var bästa sättet att göra det på om man har många fler nyckelvärdepar som man ska använda. Då lärde jag mig om spread operator, som används om man vill "kalla på" en array eller nyckelvärdepar i ett objekt, genom att bara skriva namnet på variabeln som arrayen eller objektet är kopplat till med tre punkter framför. På så sätt har jag just nu med alla nyckelvärdepar i program objekten för bättre skalbarhet, genom att använda "...program" i map funktionen men kan på samma gång lägga till, ta bort eller modifiera specifika nyckelvärdepar (i det här fallet starttiden).

## Del 2

### Vad jag använde GitHub Copilot till

Loading GIFen ville inte fungera så jag frågade Copilot varför. Problemet var att jag använde v-if="!programs" men att en tom array i JavaScript ändå är truthy, samt att jag hade glömt att ta bort "hidden" klassen från GIFen. Förslaget var att lägga till en loading boolean property och visa GIFen utifrån det, vilket jag gjorde och då löste det sig.

### Kritisk värdering av ett av förslagen
