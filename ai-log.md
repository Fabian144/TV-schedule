# Hur och var jag använde AI i uppgiften

## Del 1

Jag använde ChatGPT och lite av DuckDuckGos inbyggda AI för att lära mig vissa saker innan vi fick uppgiften, om hur man fetchar data på olika sätt och skillnaderna, hanteringen av fetchad data och hantering av arrayer. Det jag lärde mig har jag sedan använt till vissa delar av koden.

### Delarna av koden som jag lärde mig skriva med hjälp av AI

- Fetch genom try, catch och await i en async funktion
- Att man kan använda det fetchade datat (t.ex. i en ny funktion) med .then efter att ha kallat på async funktionen
- Mapa arrayer för att modifiera, lägga till eller ta bort nyckelvärdepar

### Implementeringen och värdering

ChatGPT föreslog att jag använder map() för arrayen med fetchade datat för att kunna spara dem i en variabel och använda datat utifrån den. Det var för att jag ville ha värdet för tiden då programmet startar som ett faktiskt datum (new Date()) istället för en sträng, då kan man enkelt modifiera varje "start" nyckel med map funktionen.

Då undrade jag hur man gör om man vill ha med alla nyckelvärdepar, i koden väljer jag bara ut två av dem (rad 114-117), för att det tredje ändå inte behöver visas upp. Det jag blev osäker på var om det här var bästa sättet att göra det på om man har många fler nyckelvärdepar som man ska använda. Då lärde jag mig om spread operator, som används om man vill "kalla på" en array eller nyckelvärdepar i ett objekt, genom att bara skriva namnet på variabeln som arrayen eller objektet är kopplat till med tre punkter framför. På så sätt har jag just nu med alla nyckelvärdepar i program objekten för bättre skalbarhet, genom att använda "...program" i map funktionen men kan på samma gång lägga till, ta bort eller modifiera specifika nyckelvärdepar (i det här fallet starttiden).

## Del 2

### Vissa av sakerna som jag använde GitHub Copilot till

När jag inte lyckades visa upp laddnings GIFen. Problemet var att jag använde v-if="!programs" men att en tom array i JavaScript ändå är truthy, och att jag hade glömt att ta bort "hidden" klassen från GIFen. Förslaget var att lägga till en loading boolean property och visa GIFen utifrån det, vilket jag gjorde.

Att formatera starttiden för programmen så att bara timmarna och minuterna visas, vilket inte var svårare än att använda formatTime funktionen som jag gjorde i del 1 fast direkt i HTML den här gången.

Att lära mig hur jag både kan mapa och sortera arrayen med alla program i en och samma computed property och om hur jag skulle kunna sköta uppvisningen av tidigare program på ett enklare sätt. Jag hade också glömt att se till så att knappen för att visa tidigare program bara visas när det finns program som redan visats.

Vue koden fungerade inte första gången sidan laddades så jag kollade med Copilot vad problemet var, jag hade en extra Vue CDN länk i HTML filen även fast jag redan importerar den i script.js.

### Kritisk värdering av ett AI förslag

När jag frågade Copilot hur jag skulle kunna lösa uppvisningen av tidigare program på ett enklare sätt (alltså hur jag skulle refaktorisera) föreslog AIn en väldigt kompakt kod. Förslaget var att sortera, mapa och filtrera arrayen med program i en enda computed property, samt att inte ha funktionerna som filtrerar arrayen (checkProgramNotAired och checkProgramAired) som separata funktioner utan att köra dem som arrow functions. Jag valde att ha funktionerna separat ändå för bättre läsbarhet och återanvändbarhet. Jag valde samtidigt att filtrera arrayen i en separat computed property för att det blir tydligare och enklare att ha en egen "allPrograms()" property, som bara returnerar en mapad och sorterad array med alla program i.

### Åtgärdad tillgänglighetsbrist upptäckt med Lighthouse

HTML taggen saknade ett språk attribut så jag la till det så att skärmläsare förstår att sidorna är på svenska, annars hade skärmläsare trott att språket på sidorna är samma som standardspråket användaren valt för skärmläsaren.
