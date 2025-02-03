# Installation

1. Install Docker CE (https://docs.docker.com/engine/install/)
2. Install NPM and Node (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
3. git clone git@github.com:Simplis-fr/test-case-template.git
4. cd test-case-template
5. make build
6. make start
7. cd app
8. npm i
9. npm start

Then you should have 4 apps running:

- Symfony: http://localhost:8080
- MariaDB server (port 3308 on localhost)
- PHPMyAdmin: http://localhost:8082
- Angular app: http://localhost:4200

# Your project

Our pro customers don't exactly know which insurance product they need to subscribe.
Our purpose is to do that choice for them, or at least to restrict the choice to all eligible products to their needs and context.

You have to design a user-friendly funnel, as simple as possible, able to reach that goal.
This funnel ends with the selection made by the customer, and so, a confirm message that he will contact by a sales manager.

## Business logic

For any offer, we need to collect at least the first and last name of the subscriber, his email, his phone number and his postal address.

Our catalog for pros offers several products, but we will focus on civil liabilities. Here is the list of products:

- For self-employed person (with insurer WAKAM)
- Starter (with insurer AXA)
- Rainboots (with insurer AXA)
- Raincoat (with insurer AXA)
- Waterproof (with insurer AXA)
- Avantage (with insurer HISCOX)
- Avantage Plus (with insurer HISCOX)
- Avantage Premium (with insurer HISCOX)

Below are the description of each product, including criteria and the annual premium related to each case.

### For self-employed person (with insurer WAKAM)

Legal form must be AUTO_ENTREPRENEUR.<br>
Business location is in France.<br>
All activities from the following list are covered, with the customer's annual premium:
- Commerce d'objets d'art - 239.88 €
- Créations de décorations en fleurs artificielles 119.88 €
- Cruciverbiste professionnel - 119.88 €
- Enlumineur - 239.88 €
- Gravure sur métaux - 239.88 €
- Guide touristique - 119.88 €
- Organisation d'événements pour compte d'autrui hors évènements familiaux et sportifs - 239.88 €
- Réparation d'horloges - 239.88 €
- Sociologue - 119.88 €

### Civil liability with insurer AXA

<table>
    <tr>
        <th>Professional activity</th>
        <th>Legal form</th>
        <th>Max projected turnover</th>
        <th>Business location</th>
        <th>Product</th>
        <th>Customer's annual premium</th>
    </tr>
    <tr>
        <td rowspan="4">Agence et conseil en communication, Relations publiques avec organisation d'évènement</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>France</td>
        <td>Starter</td>
        <td>214.80 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>France</td>
        <td>Rainboots</td>
        <td>277.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>1 000 000 €</td>
        <td>France</td>
        <td>Raincoat</td>
        <td>334.80 €</td>
    </tr>
    <tr>
        <td>All except AUTO_ENTREPRENEUR, EI, EIRL or EURL</td>
        <td>2 000 000 €</td>
        <td>World</td>
        <td>Waterproof</td>
        <td>403.20 €</td>
    </tr>
    <tr>
        <td rowspan="4">Commerce d'objets d'art</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>France</td>
        <td>Starter</td>
        <td>214.80 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>France</td>
        <td>Rainboots</td>
        <td>277.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>1 000 000 €</td>
        <td>France</td>
        <td>Raincoat</td>
        <td>334.80 €</td>
    </tr>
    <tr>
        <td>All except AUTO_ENTREPRENEUR, EI, EIRL or EURL</td>
        <td>1 500 000 €</td>
        <td>World</td>
        <td>Waterproof</td>
        <td>403.20 €</td>
    </tr>
    <tr>
        <td rowspan="4">Créations de décorations en fleurs artificielles</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>France</td>
        <td>Starter</td>
        <td>214.80 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>France</td>
        <td>Rainboots</td>
        <td>277.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>1 000 000 €</td>
        <td>France</td>
        <td>Raincoat</td>
        <td>334.80 €</td>
    </tr>
    <tr>
        <td>All except AUTO_ENTREPRENEUR, EI, EIRL or EURL</td>
        <td>1 500 000 €</td>
        <td>World</td>
        <td>Waterproof</td>
        <td>403.20 €</td>
    </tr>
    <tr>
        <td rowspan="4">Gravure sur métaux</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>France</td>
        <td>Starter</td>
        <td>214.80 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>France</td>
        <td>Rainboots</td>
        <td>277.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>1 000 000 €</td>
        <td>France</td>
        <td>Raincoat</td>
        <td>334.80 €</td>
    </tr>
    <tr>
        <td>All except AUTO_ENTREPRENEUR, EI, EIRL or EURL</td>
        <td>1 500 000 €</td>
        <td>World</td>
        <td>Waterproof</td>
        <td>403.20 €</td>
    </tr>
    <tr>
        <td rowspan="4">Guide touristique</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>France</td>
        <td>Starter</td>
        <td>214.80 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>France</td>
        <td>Rainboots</td>
        <td>277.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>1 000 000 €</td>
        <td>France</td>
        <td>Raincoat</td>
        <td>334.80 €</td>
    </tr>
    <tr>
        <td>All except AUTO_ENTREPRENEUR, EI, EIRL or EURL</td>
        <td>2 000 000 €</td>
        <td>World</td>
        <td>Waterproof</td>
        <td>403.20 €</td>
    </tr>
    <tr>
        <td rowspan="4">Organisation d'évènements pour compte d'autrui hors évènements familiaux et sportifs</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>France</td>
        <td>Starter</td>
        <td>214.80 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>France</td>
        <td>Rainboots</td>
        <td>277.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>1 000 000 €</td>
        <td>France</td>
        <td>Raincoat</td>
        <td>334.80 €</td>
    </tr>
    <tr>
        <td>All except AUTO_ENTREPRENEUR, EI, EIRL or EURL</td>
        <td>2 000 000 €</td>
        <td>World</td>
        <td>Waterproof</td>
        <td>403.20 €</td>
    </tr>
    <tr>
        <td rowspan="4">Sociologue</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>France</td>
        <td>Starter</td>
        <td>214.80 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>France</td>
        <td>Rainboots</td>
        <td>277.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>1 000 000 €</td>
        <td>France</td>
        <td>Raincoat</td>
        <td>334.80 €</td>
    </tr>
    <tr>
        <td>All except AUTO_ENTREPRENEUR, EI, EIRL or EURL</td>
        <td>1 500 000 €</td>
        <td>World</td>
        <td>Waterproof</td>
        <td>403.20 €</td>
    </tr>
</table>

### Civil liability with insurer HISCOX

<table>
    <tr>
        <th>Professional activity</th>
        <th>Legal form</th>
        <th>Max projected turnover</th>
        <th>Business location</th>
        <th>Product</th>
        <th>Customer's annual premium</th>
    </tr>
    <tr>
        <td rowspan="3">Agence et conseil en communication, Relations publiques avec organisation d'évènement</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>World</td>
        <td>Avantage</td>
        <td>265.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>World</td>
        <td>Avantage Plus</td>
        <td>330 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>5 000 000 €</td>
        <td>World</td>
        <td>Avantage Premium</td>
        <td>386.40 €</td>
    </tr>
    <tr>
        <td rowspan="3">Commerce d'objets d'art</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>World</td>
        <td>Avantage</td>
        <td>265.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>World</td>
        <td>Avantage Plus</td>
        <td>330 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>5 000 000 €</td>
        <td>World</td>
        <td>Avantage Premium</td>
        <td>386.40 €</td>
    </tr>
    <tr>
        <td rowspan="3">Cruciverbiste professionnel</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>World</td>
        <td>Avantage</td>
        <td>265.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>World</td>
        <td>Avantage Plus</td>
        <td>330 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>5 000 000 €</td>
        <td>World</td>
        <td>Avantage Premium</td>
        <td>386.40 €</td>
    </tr>
    <tr>
        <td rowspan="3">Enlumineur</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>World</td>
        <td>Avantage</td>
        <td>265.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>World</td>
        <td>Avantage Plus</td>
        <td>330 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>5 000 000 €</td>
        <td>World</td>
        <td>Avantage Premium</td>
        <td>386.40 €</td>
    </tr>
    <tr>
        <td rowspan="3">Gravure sur métaux</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>World</td>
        <td>Avantage</td>
        <td>265.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>World</td>
        <td>Avantage Plus</td>
        <td>330 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>5 000 000 €</td>
        <td>World</td>
        <td>Avantage Premium</td>
        <td>386.40 €</td>
    </tr>
    <tr>
        <td rowspan="3">Réparation d'horloges</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>World</td>
        <td>Avantage</td>
        <td>265.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>World</td>
        <td>Avantage Plus</td>
        <td>330 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>5 000 000 €</td>
        <td>World</td>
        <td>Avantage Premium</td>
        <td>386.40 €</td>
    </tr>
    <tr>
        <td rowspan="3">Sociologue</td>
        <td>Any</td>
        <td>150 000 €</td>
        <td>World</td>
        <td>Avantage</td>
        <td>265.20 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>500 000 €</td>
        <td>World</td>
        <td>Avantage Plus</td>
        <td>330 €</td>
    </tr>
    <tr>
        <td>Any</td>
        <td>5 000 000 €</td>
        <td>World</td>
        <td>Avantage Premium</td>
        <td>386.40 €</td>
    </tr>
</table>
