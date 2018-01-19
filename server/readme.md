# MTA Interruption Feeds
A simple API that interprets MTA interruption messaging.

We take minimal messaging from the MTA, and parse out useful information, like route changes, station identification, event tagging, and more!

A simple message like this:
```
FASTRACK PROGRAM [A] Trains run local and are rerouted between 59 St-Columbus Circle and Jay St-MetroTech [C] Service ends early - Take the [A] instead [E] Trains are rerouted in Manhattan [A] Trains make local stops and are rerouted in both directions as follows: Via the [D] between 59 St-Columbus Circle and 34 St-Herald Sq. Via the [F] between 34 St-Herald Sq and Jay St-MetroTech. [E] Trains are rerouted in both directions in Manhattan as follows: Via the [M] between 5 Av/53 St and 34 St-Herald Sq. Via the [F] between 34 St-Herald Sq and 2 Av, the last stop.
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
  stations: {},
  trains: [
    "MTA NYCT_A",
    "MTA NYCT_C",
    "MTA NYCT_E"
  ],
  ad_message: null,
  alt_instructions: "Take the [A] instead [E] Trains are rerouted in Manhattan Late Nights, 9:30 PM to 5 AM, Mon to Fri, Jan 15 - 19 Jan 22 - 26 [A] Trains make local stops and are rerouted in both directions as follows: Via the [D] between 59 St-Columbus Circle and 34 St-Herald Sq. Via the [F] between 34 St-Herald Sq and Jay St-MetroTech. [E] Trains are rerouted in both directions in Manhattan as follows: Via the [M] between 5 Av/53 St and 34 St-Herald Sq. Via the [F] between 34 St-Herald Sq and 2 Av, the last stop. Travel Alternatives [TP] Use nearby [1] [2] stations on 7 Av or [D] [F] stations on 6 Av. Affected Station Alternate Station/Service 7 Av [A] [D] 50 St [1] [2]* 57 St-7 Av [N] [Q] [R] [W] 50 St 50 St [1] [2]* 49 St [ad] (northbound) [N] [Q]* [R] [W] 47-50 Sts [ad] [A] [D] [E] [F] 42 St/Port Authority Times Sq-42 St [ad] [1] [2] [3] [7] [N] [Q] [R][W] 34 St-Penn Station (8 Av) 34 St-Penn Station (7 Av) [ad] [1] [2] [3] 34 St-Herald Sq [ad] [A] [D] [E] [F] [N] [Q] [R] [W] 23 St 23 St [1] [2]* 23 St (6 Av) [A] [E] [F] 14 St [ad] [L] (8 Av) -- Connect with [A] [D] [E] [F] at 6 Av or [4] [6] [N] [Q] [R] at 14 St-Union Sq [ad] W 4 St [ad] [A] [D] [E] [F] Christopher St [1] [2]* Spring St Houston St [1] [2]* Prince St [N] [Q]* [R] [W] W 4 St [ad] [A] [D] [E] [F] Canal St Canal St [1] [2]* Canal St [ad] [4] local [6] | [J] [N] [Q] [R] Chambers St Chambers St [ad] [1] [2] [3] Park Place [2] [3] City Hall [R] [W] World Trade Center Park Place [2] [3] Cortlandt St [ad] [R] [W] nearby Fulton St [ad] [2] [3] [4] [J] Fulton St [ad] [2] [3] [4] [J] Cortlandt St [ad] [R] [W] High St York St [A] [F] Key Transfer Stations 59 St-Columbus Circle [ad] [A] [D] and [1] [2]* 47-50 Sts [ad] [A] [D] and [E] [F] 34 St-Herald Sq [ad] [A] [D] [E] [F] and [N] [Q] [R] [W] 14 St [F] [1] [2] [3] (7 Av) and [A] [E] [F] (6 Av)",
  route_change: {
    trains: [
      "A",
      "E"
    ],
    route: [
      {
        allTrains: true,
        dir: null,
        lines: [
        "A"
        ],
        along: "D",
        from: "Mn614-A24",
        to: "Mn607-D17"
      },
      {
        allTrains: true,
        dir: null,
        lines: [
          "A"
        ],
        along: "F",
        from: "Mn607-D17",
        to: "Bk636-A41"
      },
      {
        allTrains: true,
        dir: null,
        lines: [
          "E"
        ],
        along: "M",
        from: "Mn276-F12",
        to: "Mn607-D17"
      },
      {
        allTrains: true,
        dir: null,
        lines: [
          "E"
        ],
        along: "F",
        from: "Mn607-D17",
        to: "Mn232-F14"
      }
    ],
  },
}
```
