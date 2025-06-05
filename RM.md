# Intersoc Wandelingen
## 1. Wat is het onderwerp
De applicatie beheert een lijst met de wandelingen die je kan doen met Intersoc in de alpen.
De gebruiker kan de data van de wandelingen bekijken, aanpassen en verwijderen. 
De Swagger-documentatie van de databank is beschikbaar.

## 2. De backend
### Het opstarten van de backend
#### 1) Navigeer naar de backend
    cd backend
#### 2) Installeer Node.js
    npm install
Hier installeer je de Node.js dependencies.
#### 3) Start de server
    node app.js
dit zorgt ervoor dat de server start.

### De endpoints
    GET'/wandelingen'
Hier vraag je alle wandelingen op.

    GET'/wandeling/:id'
Hier vraag je 1 specifieke wandeling op, op basis van welk id je hebt meegegeven.

    POST'/nieuweWandeling'
Hier maak je een nieuwe wandeling aan.

    UPDATE'/updateWandeling/:id'
Hier kan je de data veranderen van een bepaald id.

    DELETE'/deleteWandeling/:id'
Hier kan je data verwijderen van een bepaald id.

    GET 'api/docs'
Hier kan je de Swagger UI met documentatie vinden.

## 3. De Frontend
Dit is een pagina met een aantal wandelingen die je met intersoc kan maken met de kleuren die kenmerken voor intersoc zijn.
### De functies
#### Gegevens ophalen
    functie 'fetchWandelingen()'
Dit haalt de lijst op met de data via de GET'/Wandelingen'

#### Gegevens toevoegen
    functie 'HandleForSumbit(e)'
Toont een formulier waarmee je de data kan toevoegen.

#### Gegevens bewerken
    functie 'editWandeling(id)'
Hier wordt de data van de wandeling die je wilt wijzigen in het formulier.

#### Gegevens verwijderen
    functie 'deleteWandeling(id)'
Hier wordt de wandeling verwijderd die je wilt verwijderen.

