# Användning av AI i uppgiften

Jag använde ChatGPT och lite av DuckDuckGos inbyggda AI för att lära mig om hur man fetchar data på olika sätt och skillnaderna, hanteringen av fetchad data, hantering av arrayer, objekt och hur man bättre undviker XSS attacker.

**Delarna av koden som jag använde AI till:**

- Fetch genom try, catch och await i en async funktion
- Mappa arrayer med objekt för att modifiera, lägga till eller ta bort nycklar eller värden
- Kolla om koden är säker mot XSS attacker och använde createElement med innerText för säkerhetsskull, istället för innerHTML

**Implementeringen och värdering:**

ChatGPT föreslog att jag använder map() för arrayen med fetchade programmen, för att jag ville ha värdet för tiden då programmen startar som ett faktiskt datum (new Date()) istället för en sträng. Med map funktionen kan man enkelt modifiera varje nyckel i objekt i en array, i det här fallet för starttiden. Senare la jag till ett "hidden" nyckelvärdepar också.

Då undrade jag hur man gör om man vill ha med alla nyckelvärdepar i map funktionen, i koden behöver jag egentligen bara två av dem, för att det tredje (program beskrivningen) ändå inte används på något sätt. Det jag blev osäker på var om map funktionen alls var bra att använda om man har många nyckelvärdepar i de originella objekten istället för bara tre som i det här fallet. Då lärde jag mig om spread operator, som används om man vill "kalla på" en array eller alla nyckelvärdepar i ett objekt, genom att bara skriva namnet på variabeln som arrayen eller objektet är kopplat till med tre punkter framför. På så sätt har jag just nu med alla nyckelvärdepar i program objekten för bättre skalbarhet genom att använda "...program" i map funktionen, för att kunna använda eller modifiera fler nyckelvärdepar i framtiden.

## Del 2

### Hur och var jag använde AI

**Jag använde GitHub Copilot chatten i VSCode, alltid med antingen index.html och script.js eller både och som kontext, för bl.a. följande:**

När jag inte lyckades visa upp laddnings GIFen. Problemet var att jag använde v-if="!programs" men att en tom array i JavaScript ändå är truthy, och att jag hade glömt att ta bort "hidden" klassen från GIFen. Förslaget var att lägga till en loading boolean property och visa GIFen utifrån det, vilket jag gjorde.

Att formatera starttiden för programmen så att bara timmarna och minuterna visas, vilket inte var svårare än att använda formatTime funktionen som jag gjorde i del 1 fast direkt i HTML den här gången.

Att lära mig hur jag både kan mapa och sortera arrayen med alla program i en och samma computed property och om hur jag skulle kunna sköta uppvisningen av tidigare program på ett enklare sätt.

Vue koden fungerade inte första gången sidan laddades så jag kollade med Copilot vad problemet var, jag hade en extra Vue CDN länk i HTML filen även fast jag redan importerar den i script.js.

### Kritisk värdering av ett AI förslag

När jag frågade Copilot hur jag skulle kunna lösa uppvisningen av tidigare program på ett enklare sätt (alltså hur jag skulle refaktorisera) föreslog AIn en väldigt kompakt kod. Förslaget var att sortera, mapa och filtrera arrayen med program i en enda computed property, samt att inte ha funktionerna som filtrerar arrayen (checkProgramNotAired och checkProgramAired) som separata funktioner utan att köra dem som arrow functions. Jag valde att ha funktionerna separat ändå för bättre läsbarhet och återanvändbarhet. Jag valde samtidigt att filtrera arrayen i en separat computed property för att det blir tydligare och enklare att ha en egen "allPrograms()" property, som bara returnerar en mapad och sorterad array med alla program i.

### Åtgärdad tillgänglighetsbrist upptäckt med Lighthouse

HTML taggen saknade ett språk attribut så jag la till det så att skärmläsare förstår att sidorna är på svenska, annars hade skärmläsare trott att språket på sidorna är samma som standardspråket användaren valt för skärmläsaren.
