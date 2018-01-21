# MTA Interruption Feeds
A simple API that interprets MTA Subway Disruption Messaging.

[![Build Status](https://travis-ci.org/Atomox/mta-delays.svg?branch=master)](https://travis-ci.org/Atomox/mta-delays)



We take minimal messaging from the MTA, and parse out useful information, like route changes, station identification, event tagging, and more!



A simple message like this:
```
FASTRACK PROGRAM [A] Trains run local and are rerouted between 59 St-Columbus Circle and Jay St-MetroTech [C] Service ends early - Take the [A] instead [E] Trains are rerouted in Manhattan [A] Trains make local stops and are rerouted in both directions as follows: Via the [D] between 59 St-Columbus Circle and 34 St-Herald Sq. Via the [F] between 34 St-Herald Sq and Jay St-MetroTech. [E] Trains are rerouted in both directions in Manhattan as follows: Via the [M] between 5 Av/53 St and 34 St-Herald Sq. Via the [F] between 34 St-Herald Sq and 2 Av, the last stop. Travel Alternatives [TP] Use nearby [1] [2] stations on 7 Av or [D] [F] stations on 6 Av.
```

turns into this:

```
{
 type_detail: [
   "service_ends_early",
   "running_local",
   "route_change"
 ],
 durration: "Late Nights, 9:30 PM to 5 AM, Mon to Fri, Jan 15 - 19 Jan 22 - 26",
 message: "FASTRACK PROGRAM [A] Trains run local and are rerouted between 59 St-Columbus Circle and Jay St-MetroTech [C] Service ends early - Take the [A] instead [E] Trains are rerouted in Manhattan [A] Trains make local stops and are rerouted in both directions as follows: Via the [D] between 59 St-Columbus Circle and 34 St-Herald Sq. Via the [F] between 34 St-Herald Sq and Jay St-MetroTech. [E] Trains are rerouted in both directions in Manhattan as follows: Via the [M] between 5 Av/53 St and 34 St-Herald Sq. Via the [F] between 34 St-Herald Sq and 2 Av, the last stop.",
 message_station_parse: "FASTRACK PROGRAM [A] Trains run local and are rerouted between [Mn614-A24] and [Bk636-A41] [C] Service ends early - Take the [A] instead [E] Trains are rerouted in Manhattan Late Nights, 9:30 PM to 5 AM, Mon to Fri, Jan 15 - 19 Jan 22 - 26 [A] Trains make local stops and are rerouted in both directions as follows: Via the [D] between [Mn614-A24] and [Mn607-D17]. Via the [F] between [Mn607-D17] and [Bk636-A41]. [E] Trains are rerouted in both directions in Manhattan as follows: Via the [M] between [Mn276-F12] and [Mn607-D17]. Via the [F] between [Mn607-D17] and [Mn232-F14], the last stop.",
 stations: {
  MTA NYCT_A: {
    stations: {
      Mn614-A24: "59 St-Columbus Circle",
      Mn611-A27: "42 St/Port Authority",
      Mn618-A31: "14 St",
      Mn167-A32: "W 4 St",
      Mn169-A34: "Canal St",
      Mn624-A36: "Chambers St",
      Mn628-A38: "Fulton St",
      Bk173-A40: "High St",
      Bk636-A41: "Jay St-MetroTech"
    }
  },
  MTA NYCT_C: {
    stations: {
      Mn614-A24: "59 St-Columbus Circle",
      Mn162-A25: "50 St",
      Mn611-A27: "42 St/Port Authority",
      Mn165-A30: "23 St",
      Mn618-A31: "14 St",
      Mn167-A32: "W 4 St",
      Mn168-A33: "Spring St",
      Mn169-A34: "Canal St",
      Mn624-A36: "Chambers St",
      Mn628-A38: "Fulton St",
      Bk173-A40: "High St",
      Bk636-A41: "Jay St-MetroTech"
    }
  },
  MTA NYCT_E: {
    stations: {
      Mn276-F12: "5 Av/53 St",
      Mn277-D14: "7 Av",
      Mn162-A25: "50 St",
      Mn611-A27: "42 St/Port Authority",
      Mn165-A30: "23 St",
      Mn618-A31: "14 St",
      Mn167-A32: "W 4 St",
      Mn168-A33: "Spring St",
      Mn169-A34: "Canal St",
      Mn624-E01: "World Trade Center"
    }
  },
 },
 trains: [
   "MTA NYCT_A",
   "MTA NYCT_C",
   "MTA NYCT_E"
 ],
 ad_message: null,
 alt_instructions: "Travel Alternatives [TP] Use nearby [1] [2] stations on 7 Av or [D] [F] stations on 6 Av.",
 route_change: {
   trains: [
     "A",
     "E"
   ],
   route: [
     {
       allTrains: true,
       dir: null,
       lines: ["A"],
       along: "D",
       from: "Mn614-A24",
       to: "Mn607-D17"
     },
     {
       allTrains: true,
       dir: null,
       lines: ["A"],
       along: "F",
       from: "Mn607-D17",
       to: "Bk636-A41"
     },
     {
       allTrains: true,
       dir: null,
       lines: ["E"],
       along: "M",
       from: "Mn276-F12",
       to: "Mn607-D17"
     },
     {
       allTrains: true,
       dir: null,
       lines: ["E"],
       along: "F",
       from: "Mn607-D17",
       to: "Mn232-F14"
     }
   ],
 },
}
```
