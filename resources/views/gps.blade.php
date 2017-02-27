@extends('layouts.staticPages')

@section('content')
<div class="panel panel-default">
  <div class="panel-heading">Wie kann ich meinen Standort für Maps.MetaGer.de einschalten?</div>
  <div class="panel-body">
    <p>Ganz einfach: Schalten sie hierfür lediglich die GPS-Funktion ihres Mobilgeräts ein.</p>
    <p>Für Android Geräte genügt hier ein Wischen vom oberen Bildschirmrand nach unten. Ein Menü erscheint mit verschiedenen Schnellzugriffen. Eins davon nennt sich "GPS". Ein Klick hierauf aktiviert das GPS. Laden Sie nun unsere Seite neu um Zugriff auf nachfolgend genannte Funktionen zu haben.</p>
  </div>
</div>
<div class="panel panel-default">
  <div class="panel-heading">Welche Vorteile bringt das Einschalten vom GPS?</div>
  <div class="panel-body">
    <p>Hierdurch können zusätzliche Funktionen zur Verfügung gestellt werden:</p>
    <ul>
      <li>Automatisches zentrieren der Karte um möglichst relevante Suchergebnisse in näherer Umgebung zu finden,</li>
      <li>Automatisches berechnen der Route vom/zum aktuellen Standort,</li>
      <li>Freischalten des <a href="/hilfe/routen-assistent">Routen-Assistenten</a>, welcher Sie Schritt für Schritt bis zum Ziel navigieren kann.</li>
    </ul>
  </div>
</div>
<div class="panel panel-default">
  <div class="panel-heading">Werbt Ihr nicht damit, dass die geographische Position geschützt bleibt?</div>
  <div class="panel-body">
    <p>
    Das ist korrekt. In den meisten Fällen verlässt die berechnete Position nicht einmal das Gerät auf dem diese abgefragt wird. Und in den Fällen wo sie es tut (z.B. beim Berechnen einer Route vom aktuellen Standort aus), wird diese zuvor in ein Format gebracht, welches sich von uns nicht unterscheiden lässt von den Koordinaten eines jeden anderen Wegpunkts.
    </p>
    <p>
    Positionsdaten, die uns erreichen, werden dann direkt dafür verwendet z.B. die kürzeste Route zum Ziel zu berechnen (und nur dafür).
    </p>
    <p>
    Wir schreiben auch keine Logs über die bisher abgefragten Daten. Diese werden tatsächlich nur dafür verwendet, wofür sie sich am Besten eignen: Das Leben eines jeden Nutzers zu erleichtern, ohne dass er dafür seine Daten verkaufen muss.
    </p>
  </div>
</div>
@endsection
