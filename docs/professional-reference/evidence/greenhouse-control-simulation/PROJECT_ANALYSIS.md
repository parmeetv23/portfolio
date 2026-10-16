# Climate Control Simulation

> Transfer source: `Resume_Builder/evidence/greenhouse-control-simulation/PROJECT_ANALYSIS.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **supporting-analysis**. This is a preserved historical investigation, not a new test run or an independently confirmed career record. Statements about the investigation, workspace, file creation, or validation describe that original analysis. Internal code/data paths refer to the investigated project and are not files supplied in this collection.

## Overview

The project is a Java desktop greenhouse/environmental control simulation. It models three independently controlled environmental variables: air temperature, humidity, and soil moisture. A Swing GUI lets a user configure target values, current values, environmental change rates, actuator rates, time units, and sampling intervals. The simulation runs separate controller loops for the three environmental subsystems, updates actuator states, displays status over time, and records results to text files that can be saved and reopened later.

The implementation is contained in the ten provided Java source files in package `Assignment5`. No database, web backend, external API, package-management file, automated test suite, CI/CD configuration, or deployment infrastructure was provided.

The supplied ownership statement says the original implementation is the developer's work. Git history was not used to establish authorship.

## Repository Scope

| File | Primary responsibility |
| --- | --- |
| `ClimateControlSimulation.java` | Application entry point and dependency construction |
| `ClimateControlSimulationView.java` | Swing GUI, user input, live results, file persistence, saved-result viewing |
| `ClimateControlSimulationController.java` | Top-level event handling and simulation orchestration |
| `AirTempController.java` | Runnable temperature controller |
| `HumidityController.java` | Runnable humidity controller |
| `SoilMoistureController.java` | Runnable soil-moisture controller |
| `Furnace.java` | Heating actuator/domain object |
| `AirConditioner.java` | Cooling actuator/domain object |
| `Humidifier.java` | Humidity actuator/domain object |
| `Sprinkler.java` | Soil-moisture actuator/domain object |

The provided source contains approximately **2,130 lines**, including comments and blank lines. This is a direct count of the ten supplied files.

## Contributions

Based on the supplied ownership statement and source code, the implementation includes:

- Built a Swing desktop interface for configuring and running a greenhouse climate-control simulation.
- Modeled temperature, humidity, and soil moisture as three separately sampled control subsystems.
- Implemented heating, cooling, humidification, and irrigation actuator classes.
- Implemented target-based controller logic that activates or deactivates actuators according to current state relative to configured targets.
- Implemented Java `Runnable` controllers for temperature, humidity, and soil moisture.
- Coordinated multiple Java threads so environmental subsystems can update independently.
- Built a top-level controller that connects Swing events to subsystem setup, simulation startup, status updates, saving, navigation, and reopening prior results.
- Supported per-minute and per-hour rate inputs and normalized actuator/environmental rates for simulation use.
- Added configurable sampling intervals for the three subsystem controllers.
- Built a live results view that appends environmental values and actuator statuses over time.
- Implemented text-file persistence using a temporary run log, user-named saved copies, a saved-path index, and a previous-results viewer.
- Implemented numeric-input parsing and error handling.
- Added JavaDoc-style documentation throughout the source.

Swing, AWT events, Java threading, collections, and Java file-I/O classes are standard-library/framework functionality. The custom contribution is the application logic and composition of those APIs.

## Architecture

```text
ClimateControlSimulation
        |
        +--> ClimateControlSimulationView
        |
        +--> Furnace -----------+
        +--> AirConditioner ----+--> AirTempController --------+
        |                                                   |
        +--> Humidifier ---------> HumidityController -------+--> ClimateControlSimulationController
        |                                                   |
        +--> Sprinkler ----------> SoilMoistureController ---+
                                                            |
                                                            +--> Swing events
                                                            +--> live result updates
                                                            +--> file persistence
```

`ClimateControlSimulation.main()` constructs one view, four actuator/domain objects, three subsystem controllers, and one top-level controller. Dependencies are passed into controllers through constructors.

Primary flow:

```text
User configures Swing form
        -> Start Simulation
        -> top-level controller calls setupController() on all three subsystems
        -> subsystem threads start
        -> each subsystem updates independently
        -> coordinating loop polls states/statuses
        -> view updates GUI and appends results to disk
```

Environmental state is distributed across controllers and actuator objects rather than centralized in one model class.

## Technologies

### Language

- Java

### GUI / Event APIs

- Java Swing
- Java AWT
- `JFrame`, `JPanel`, `JScrollPane`, `JLabel`, `JTextField`, `JButton`, `JCheckBox`, `ButtonGroup`, `JOptionPane`, `JTextArea`
- `ActionListener` / `ActionEvent`
- `BorderLayout` / `BoxLayout`

### Concurrency

- `Runnable`
- `Thread`
- `Thread.sleep(...)`
- thread interruption

### File I/O / Collections

- `File`, `FileReader`, `FileWriter`
- `BufferedReader`, `BufferedWriter`, `PrintWriter`
- `File.createTempFile(...)`
- `ArrayList<String>`

### External libraries / databases / infrastructure

None demonstrated in the supplied files.

## Features

### Temperature control

`AirTempController` combines a `Furnace` and `AirConditioner`. It reads target/current temperature, weather-driven temperature change, heating/cooling rates, time frames, and a sampling interval. Each loop applies environmental change and then:

- activates the furnace when temperature is more than 3 units below target,
- activates the air conditioner when temperature is more than 3 units above target,
- turns both off inside the ±3 target band.

### Humidity control

`HumidityController` combines environmental humidity change with a `Humidifier`. It activates the humidifier when humidity is more than 3 units below target and turns it off within the target band. No dehumidifier is implemented.

### Soil-moisture control

`SoilMoistureController` combines environmental soil-moisture change with a `Sprinkler`. It activates watering when moisture is more than 3 units below target and turns it off in the target band. No active drying/removal actuator is implemented.

### Rate/time-frame handling

The actuator classes accept rates in `Minute` or `Hour` units. Most hourly values are converted to per-minute values before the control loop uses them.

### Sampling

The three subsystem controllers read separate sampling increments from the view, convert seconds to milliseconds, and call `Thread.sleep(...)` inside their loops.

### Live results

The results view appends:

- elapsed time,
- furnace status,
- air-conditioner status,
- humidifier status,
- sprinkler status,
- current temperature,
- current humidity,
- current soil moisture.

The panel is revalidated/repainted and scrolled toward the newest output.

### Result persistence

Each view update is appended to a temporary text file. The user can save the run under a chosen name, store that saved path in `nameStorage.txt`, list saved results, and open a previous simulation in a read-only text area.

### Navigation

The UI supports starting, stopping the top-level update loop, saving current results, returning to configuration, and viewing saved results.

## Backend / APIs

Not applicable. This is a local Java desktop application with no HTTP endpoints, web server, remote API, socket protocol, or database service.

## Frontend

`ClimateControlSimulationView.java` implements the Swing UI.

The configuration view provides fields and controls for:

- target/current temperature, humidity, and soil moisture,
- environmental changes,
- furnace, air-conditioner, humidifier, and sprinkler rates,
- minute/hour rate units,
- subsystem sampling increments,
- simulation/result controls.

The result view is a separate scrollable panel. Listener-registration methods allow the top-level controller to own most event coordination. `JOptionPane` is used for file naming, saved-result selection, invalid-input errors, and result viewing.

## Data / Persistence

There is no database. Persistence is local-file based.

- A temporary file is created with `File.createTempFile("data-", ".txt")`.
- `update(...)` appends each simulation snapshot to that file.
- `saveTemp(...)` copies it to `<user-name>.txt`.
- `nameStorage.txt` stores absolute paths of saved result files.
- `getSavedFiles()` loads those paths into an `ArrayList<String>`.
- `seePreviousResults(...)` reads a selected result line-by-line into a non-editable `JTextArea`.

## External Integrations

None demonstrated.

## Reliability / Failure Handling

### Input validation

Subsystem setup methods parse numeric input and catch `NumberFormatException`. Invalid values call `view.invalid(...)`, which displays an error dialog and terminates the application with `System.exit(0)`.

### File errors

Several file operations handle `IOException`; some save-related operations propagate it to callers.

### Target deadband

The controllers use a three-unit deadband around target values. This is a verified code behavior, not evidence of physical tuning for a real greenhouse.

### Thread-shutdown limitation

The top-level controller creates three subsystem threads and one result-loop thread. When its loop ends, it interrupts the three subsystem threads. However, the subsystem controllers catch and ignore `InterruptedException` and continue loops governed by their own flags. The supplied top-level controller does not set those flags false. The source therefore does not establish reliable cooperative shutdown of those worker loops solely through interruption.

### Shared-state synchronization

Mutable state is shared between worker controllers and the display/coordinator without `synchronized`, `volatile`, locks, or atomic variables in the supplied files. The project demonstrates concurrency, but not a formal thread-safe memory-synchronization design.

## Security

No authentication, authorization, accounts, network transport, secrets, or encryption are present. The application is local and file-based. Saved result names are used to create local `.txt` files; no dedicated path-sandboxing layer is implemented.

## Testing / Quality

No automated tests or test-framework configuration were supplied. No defensible claims can be made about test count, code coverage, CI testing, or regression automation.

The implementation does show modular separation among startup, GUI/persistence, orchestration, subsystem control, and actuator state. Classes and methods are extensively documented with JavaDoc-style comments.

## Deployment / Infrastructure

No Docker, cloud configuration, CI/CD, installer, Maven/Gradle build file, or deployment configuration was supplied. The exact JDK/runtime used is not established by these ten files.

## Performance / Scale

No benchmarks or load tests were supplied. Directly verifiable structural metrics are:

| Metric | Value | Evidence |
| --- | ---: | --- |
| Java source files/classes supplied | 10 | Provided file set |
| Approximate lines including comments/blank lines | 2,130 | Direct count of supplied files |
| Environmental dimensions controlled | 3 | Temperature, humidity, soil moisture controllers |
| Actuator/domain classes | 4 | Furnace, AirConditioner, Humidifier, Sprinkler |
| Runnable subsystem controllers | 3 | AirTempController, HumidityController, SoilMoistureController |
| Thread objects created by top-level run | 4 | Three subsystem threads + one coordinator/result-loop thread |
| Target deadband | ±3 units | Controller branch conditions |

No throughput, latency, CPU, memory, user-capacity, or real-world control-performance claim is supported.

## Technical Challenges / Complexity

- Coordinating three independent simulation loops with separate state, actuators, and sampling intervals.
- Modeling bidirectional temperature control using separate heating and cooling actuators.
- Combining uncontrolled environmental change with actuator-driven correction.
- Separating GUI input/presentation from subsystem controller logic.
- Polling state from multiple worker threads for a live status display.
- Persisting run history to a temporary file, copying named snapshots, indexing saved paths, and reopening previous results.

## Documentation / Operational Support

Documentation is primarily embedded JavaDoc-style source documentation. No README, user manual, runbook, architecture document, or deployment guide was supplied.

## Quantifiable Evidence

| Metric | Value | Evidence |
| --- | ---: | --- |
| Supplied Java files | 10 | Complete provided file set |
| Approximate total lines | 2,130 | Static count |
| Controlled subsystems | 3 | AirTempController, HumidityController, SoilMoistureController |
| Actuator abstractions | 4 | Furnace, AirConditioner, Humidifier, Sprinkler |
| Runnable subsystem controllers | 3 | Source declarations |
| Threads created per top-level simulation run | 4 | `ClimateControlSimulationController.run()` |
| Temperature actuators | 2 | Furnace + AirConditioner |
| Humidity actuators | 1 | Humidifier |
| Soil-moisture actuators | 1 | Sprinkler |
| Target threshold | 3 units either side | Controller conditions |

## Evidence Map

### Three environmental control subsystems

**Evidence:** `ClimateControlSimulation.java`, `AirTempController.java`, `HumidityController.java`, `SoilMoistureController.java`.

### Concurrent subsystem execution

**Evidence:** the three subsystem controllers implement `Runnable`; `ClimateControlSimulationController.run()` creates and starts one thread for each plus a separate loop thread.

### Bidirectional temperature control

**Evidence:** `Furnace.java`, `AirConditioner.java`, and `AirTempController.java`.

### Swing configuration and live result UI

**Evidence:** `ClimateControlSimulationView.java`.

### File-based run-history persistence

**Evidence:** `ClimateControlSimulationView.update()`, `saveTemp()`, `saveName()`, `getSavedFiles()`, `getFile()`, `seePreviousResults()`, and `clearFile()`; related event handlers in `ClimateControlSimulationController.java`.

### Numeric-input validation

**Evidence:** `setupController()` in all three subsystem controllers and `ClimateControlSimulationView.invalid(...)`.

## Git / Development History

Not analyzed. Git history was not provided and is unnecessary to determine authorship under the supplied sole-developer statement.

## Uncertain / Not Verifiable

The supplied files do not establish:

- exact course/assignment requirements,
- grade or grading criteria,
- development timeline,
- exact JDK used,
- deployment/distribution,
- real greenhouse use,
- real sensor or actuator integration,
- physical control accuracy,
- automated or manual test results,
- measured performance,
- user counts, adoption, or impact,
- whether additional source/support files existed elsewhere.

The project should be described as a **simulation**, not a physical greenhouse automation system, because no hardware integration is present.

## Questions Requiring External Context

1. What course and assignment was this created for?
2. Was any starter code supplied?
3. Were concurrency and the three subsystems assignment requirements?
4. Was the ±3 target band specified or chosen during implementation?
5. Were persistence and previous-result viewing required or independently designed?
6. Were prescribed manual test scenarios used?
7. What JDK version was used?
8. Are assignment specifications, screenshots, or execution transcripts available as evidence?

## Additional Technical Details

Several source-level mismatches should be preserved rather than silently corrected in downstream descriptions:

- `ClimateControlSimulationView.getAirConditionerRate()` returns the furnace-rate text field instead of the air-conditioner-rate text field.
- The furnace time-frame `ButtonGroup` is populated with air-conditioner checkbox references in the supplied constructor code rather than the furnace checkbox references.
- The soil-moisture weather time-frame `ButtonGroup` is populated with humidity-weather checkbox references rather than the moisture-weather checkbox references.
- `Humidifier.setWeatherCondition(..., "Hour")` multiplies by 60, unlike the analogous furnace, air-conditioner, and sprinkler hourly conversions, which divide by 60.
- The top-level stop flag ends the coordinator/result loop but does not directly set the three subsystem-loop flags false.
- Worker controllers catch and ignore `InterruptedException`, limiting the shutdown effect of thread interruption.
- Mutable state is shared across threads without explicit synchronization constructs.
- `ClimateControlSimulationController` implements `Runnable`, but the start action invokes `this.run()` directly; that method then creates the worker/result threads.
- A result-increment input exists in the view, while the coordinating loop uses a fixed one-second sleep in the supplied controller.

These are descriptions of the source as supplied and should not be converted into claims that every runtime path fails without execution evidence.

## Final Technical Record

The supplied project is a self-contained Java Swing climate-control simulation composed of ten source files. It models three environmental dimensions—temperature, humidity, and soil moisture—through four actuator abstractions and three `Runnable` subsystem controllers. A coordinating controller starts the worker threads and a result-update loop, while the Swing view collects configuration, displays running state, records simulation snapshots, saves named histories, and reopens prior runs.

The strongest demonstrated technical concepts are Java object-oriented design, event-driven Swing development, controller-based decomposition, Java concurrency with `Runnable`/`Thread`, independent simulation loops, target/deadband control logic, configurable rate/time-unit handling, local file I/O, persistence, and input/error handling. No evidence supports claims of web services, databases, external APIs, hardware integration, automated testing, production deployment, or measured performance.
