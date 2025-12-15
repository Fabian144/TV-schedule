# Hur och var jag använde AI i uppgiften

Jag använde ChatGPT och lite av DuckDuckGos inbyggda AI för att lära mig vissa saker innan vi fick uppgiften, om hur man fetchar data på olika sätt och skillnaderna, hanteringen av fetchad data och hantering av arrayer. Det jag lärde mig har jag sedan använt till vissa delar av koden.

**Delarna av koden som jag lärde mig skriva med hjälp av AI:**
- Fetch genom try, catch och await i en async funktion
- Att man kan använda det fetchade datat (t.ex. i en ny funktion) med .then efter att ha kallat på async funktionen
- Mappa arrayer för att modifiera, lägga till eller ta bort nycklar eller värden

**Implementeringen och värdering:**

ChatGPT föreslog att jag använder map() för arrayen med fetchade datat för att kunna spara dem i en variabel och använda datat utifrån den. Det var för att jag ville ha värdet för tiden då programmet startar som ett faktiskt datum (new Date()) istället för en sträng, då kan man enkelt modifiera varje "start" nyckel på det sättet.
Då undrade jag hur man gör om man vill ha med alla nyckelvärdepar, i koden väljer jag bara ut två av dem (rad 114-117), för att det tredje ändå inte behöver visas upp. Det jag blev osäker på var om det här var bästa sättet att göra det på om man har många fler nyckelvärdepar som man ska använda. Då läste jag på och lärde mig om spread operator, som används om man vill använda en array utan att behöva skriva in själva arrayen, utan man skriver namnet (variabeln) på arrayen med tre punkter framför. På så sätt kan man konstatera att man vill ha med alla nyckelvärdepar när man använder map() men kan lägga till, ta bort eller modifiera specifika nyckelvärdepar på samma gång.
