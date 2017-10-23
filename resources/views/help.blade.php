<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8"/>
    <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
    <meta content="width=device-width, initial-scale=1, user-scalable=no" name="viewport"/>
    <title>
        Maps - MetaGer
    </title>
    <style>
        @font-face {
            font-family: "Liberation Sans";
            src: url(/fonts/LiberationSans-Regular.ttf);
        }

        * {
            font-family: "Liberation Sans", Verdana, Tahoma;
        }

        .panel-heading {
            font-weight: bold;
            font-size: 120%;
        }

        .panel-heading.big-header {
            font-size: 180%;
            padding: 7px 15px;
            margin: 15px 0;
            font-weight: normal;
            background-color: #ff9517;
            color: white;
            border-radius: 20px;
        }

        .panel-heading:not(.big-header), .panel-body {
            padding: 0px 15px;
        }

        .content {
            max-widtH: 900px;
            margin: 0 auto;
            padding: 20px;
        }

        .panel {
            line-height: 1.4;
        }

        @media (max-width: 900px) {
            body {
                margin: 0;
            }

            .content {
                padding: 0;
            }

            .panel-heading.big-header {
                border-radius: 0;
            }

            ul {
                padding-left: 20px;
            }
        }
    </style>
</head>
<body>
<div class="content">
    <div class="panel-heading big-header">Offline Karten</div>
    <div class="panel">
        <div class="panel-body">
            <p>Seit kurzem bieten wir für alle Nutzer unserer <a href="https://metager.de/app">Android App</a> optional den Download von benötigtem Kartenmaterial an.</p>
            <p>Gebiete, die über diese Funktion heruntergeladen werden, benötigen ab dem Zeitpunkt keine aktive Internetverbindung mehr um angezeigt zu werden.
            Dies spart einerseits mobiles Datenvolumen, andererseits wird die Karte auch in Gebieten ohne ausgebautem Mobilfunknetz jederzeit korrekt angezeigt.</p>
            <p>Um die Kartendaten für ein Gebiet herunterzu laden, gehen Sie wie folgt vor:</p>
            <ul>
                <li>Öffnen Sie das Kontextmenü links neben dem Suchfeld in Ihrer Android App und klicken auf "Offline Karten"</li>
                <li>Klicken Sie im neuen Menü auf "Gebiet hinzufügen"</li>
                <li>Klicken Sie auf das für Sie passende, rot umrandete, Gebiet und im Anschluss auf das Download Symbol</li>
            </ul>
            <p>=> Der Download beginnt nun; Sobald dieser abgeschlossen ist nutzen Sie für dieses Gebiet Offline Karten.</p>
            <p><b>Wichtig:</b> Die Offline Funktion ist aktuell auf die Anzeige der Karten beschränkt. Um eine Suche durchzuführen, oder eine Route zu berechnen benötigen Sie weiterhin eine aktive Internetverbindung.</p>
        </div>
    </div>
    <div class="panel-heading big-header">GPS und Positionsdaten</div>
    <div class="panel">
        <div class="panel-heading">Wie kann ich meinen Standort für Maps.MetaGer.de einschalten?</div>
        <div class="panel-body">
            <p>Ganz einfach: Schalten sie hierfür lediglich die GPS-Funktion ihres Mobilgeräts ein.</p>
            <p>Für Android Geräte genügt hier ein Wischen vom oberen Bildschirmrand nach unten. Ein Menü erscheint mit
                verschiedenen Schnellzugriffen. Eins davon nennt sich "GPS". Ein Klick hierauf aktiviert das GPS. Laden
                Sie nun unsere Seite neu um Zugriff auf nachfolgend genannte Funktionen zu haben.</p>
        </div>
    </div>
    <div class="panel">
        <div class="panel-heading">Welche Vorteile bringt das Einschalten vom GPS?</div>
        <div class="panel-body">
            <p>Hierdurch können zusätzliche Funktionen zur Verfügung gestellt werden:</p>
            <ul>
                <li>Automatisches zentrieren der Karte um möglichst relevante Suchergebnisse in näherer Umgebung zu
                    finden,
                </li>
                <li>Automatisches berechnen der Route vom/zum aktuellen Standort,</li>
                <li>Freischalten des <a href="#route-assist">Routen-Assistenten</a>, welcher Sie Schritt für
                    Schritt bis zum Ziel navigieren kann.
                </li>
            </ul>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">Werbt Ihr nicht damit, dass die geographische Position geschützt bleibt?</div>
        <div class="panel-body">
            <p>
                Das ist korrekt. In den meisten Fällen verlässt die berechnete Position nicht einmal das Gerät auf dem
                diese abgefragt wird. Und in den Fällen wo sie es tut (z.B. beim Berechnen einer Route vom aktuellen
                Standort aus), wird diese zuvor in ein Format gebracht, welches sich von uns nicht unterscheiden lässt
                von den Koordinaten eines jeden anderen Wegpunkts.
            </p>
            <p>
                Positionsdaten, die uns erreichen, werden dann direkt dafür verwendet z.B. die kürzeste Route zum Ziel
                zu berechnen (und nur dafür).
            </p>
            <p>
                Wir schreiben auch keine Logs über die bisher abgefragten Daten. Diese werden tatsächlich nur dafür
                verwendet, wofür sie sich am Besten eignen: Das Leben eines jeden Nutzers zu erleichtern, ohne dass er
                dafür seine Daten verkaufen muss.
            </p>
        </div>
    </div>
    <div class="panel-heading big-header" id="route-assist">Routen-Assistent</div>
    <div class="panel panel-default">
        <div class="panel-heading"></div>
        <div class="panel-body">
            <p>Voraussetzung hierfür ist ein halbwegs aktueller mobiler Browser (z.B. Firefox - zu finden im App-Store).</p>
            <p>Plant man nun eine Route zu verschiedenen Wegpunkten, muss der Startpunkt die aktuelle <a href="/hilfe/gps">GPS-Position</a> sein. Bei eingeschaltetem GPS auf dem Gerät erscheint eine entsprechende Option, wenn man die Eingabe für den Wegpunkt startet.</p>
            <p>Alle weiteren Wegpunkte können wie gewohnt beliebig entweder über die Suchfunktion innerhalb der Eingabebox für Wegpunkte im Routenplaner, oder durch einen Klick auf die Karte hinzugefügt werden.</p>
            <p>Nach einem Klick auf "Route berechnen" erscheint nun die Wegbeschreibung und zusätzlich darüber ein Knopf "Routenführung starten".</p>
            <p>Ein Klick auf diesen Knopf startet dann die Navigation.</p>
        </div>
    </div>
</div>
</body>
</html>
