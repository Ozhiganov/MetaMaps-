@extends('layouts.staticPages')

@section('content')
<div class="panel panel-default">
  <div class="panel-heading">Was ist der Routen-Assistent?</div>
  <div class="panel-body">
    <p>Unser Routen Assistent funktioniert vom Prinzip her wie ein herkömmliches Navigationsgerät.</p>
    <p>Mit seiner Hilfe kann man sich Schritt-für-Schritt von A nach B navigieren lassen.</p>
  </div>
</div>
<div class="panel panel-default">
  <div class="panel-heading">Wie verwende ich den Routen-Assistenten?</div>
  <div class="panel-body">
    <p>Voraussetzung hierfür ist ein halbwegs aktueller mobiler Browser (z.B. Firefox - zu finden im App-Store).</p>
    <p>Plant man nun eine Route zu verschiedenen Wegpunkten, muss der Startpunkt die aktuelle <a href="/hilfe/gps">GPS-Position</a> sein. Bei eingeschaltetem GPS auf dem Gerät erscheint eine entsprechende Option, wenn man die Eingabe für den Wegpunkt startet.</p>
    <p>Alle weiteren Wegpunkte können wie gewohnt beliebig entweder über die Suchfunktion innerhalb der Eingabebox für Wegpunkte im Routenplaner, oder durch einen Klick auf die Karte hinzugefügt werden.</p>
    <p>Nach einem Klick auf "Route berechnen" erscheint nun die Wegbeschreibung und zusätzlich darüber ein Knopf "Routenführung starten".</p>
    <p>Ein Klick auf diesen Knopf startet dann die Navigation.</p>
  </div>
</div>
@endsection
