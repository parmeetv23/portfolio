# Bare-Metal Raspberry Pi 4 SNES Controller / Slide Puzzle Integration

> Transfer source: `Resume_Builder/evidence/bare-metal-raspberry-pi-controller/PROJECT_ANALYSIS.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **supporting-analysis**. This is a preserved historical investigation, not a new test run or an independently confirmed career record. Statements about the investigation, workspace, file creation, or validation describe that original analysis. Internal code/data paths refer to the investigated project and are not files supplied in this collection.

## Overview

This project combines bare-metal Raspberry Pi 4 programming with a host-side Python/Pygame application.

At the low level, an AArch64 bare-metal program running on a Raspberry Pi 4 directly configures BCM2711 memory-mapped GPIO registers, polls a physical SNES controller using its latch/clock/data protocol, encodes the 16-bit button state, and transmits changed controller states over the Raspberry Pi Mini UART at approximately 30 Hz.

On the host side, Python code opens a serial connection, parses hexadecimal controller-state messages, maps SNES button bits to application actions, and integrates those actions into a graphical 4×4 slide-puzzle game implemented with Pygame.

The supplied project also includes low-level support and build/debug infrastructure for producing and running a `kernel8.img` bare-metal image, including AArch64 startup assembly, a linker script, a freestanding cross-compilation Makefile, Raspberry Pi GPIO/UART/system-timer support, OpenOCD/JTAG configuration, and a GDB initialization script.

Two omitted files were explicitly described by the developer as standard support material:
- `requirements.txt`
- `systimer.h`

They are acknowledged as part of the original project environment but are not used as evidence for custom implementation claims here.

---

## Repository Scope

The supplied files fall into four major groups.

### Bare-metal application code

- `main.c`
  - configures GPIO pins for the SNES controller
  - polls controller state
  - encodes active-low button signals into a 16-bit value
  - outputs changed state over UART
  - throttles polling with microsecond delays

### Raspberry Pi hardware support

- `gpio.h`
  - defines BCM2711 memory-mapped GPIO register addresses
- `uart.c`
  - configures and operates the Raspberry Pi 4 Mini UART
- `uart.h`
  - UART function declarations
- `systimer.c`
  - reads the BCM system timer and implements microsecond delay
- `start.s`
  - AArch64 bare-metal startup routine
- `link.ld`
  - explicit memory map and executable section placement

### Build / run / debug infrastructure

- `Makefile`
  - cross-compiles C and AArch64 assembly
  - links a freestanding ELF image
  - produces `kernel8.img`
  - supports QEMU
  - supports SD-card / Compute Module deployment
  - supports GDB + OpenOCD/JTAG debugging
- `openocd.cfg`
  - selects the Raspberry Pi 4 board and JTAG adapter configuration
- `UofCPi4HatV3.cfg`
  - configures an FTDI-based JTAG interface
- `gdb_jtag.init`
  - starts OpenOCD, connects GDB, loads the ELF image, and defines a shutdown macro
- `kernel8.img`
  - supplied compiled bare-metal binary image

### Host-side serial/game integration

- `A4.py`
  - serial test/decoder for SNES controller hexadecimal states
- `screen.py`
  - basic serial terminal/monitor script
- `slidepuzzle-original.py`
  - Pygame slide-puzzle code derived from Al Sweigart's public slide-puzzle example and extended with serial SNES-controller handling

The Pygame slide-puzzle source explicitly credits Al Sweigart and the original Simplified BSD-licensed game. The base puzzle implementation should therefore not be attributed as original work. The project-specific serial/controller integration layered onto the game is separately identifiable in the supplied file.

---

## Contributions

Based on the supplied source and the developer's ownership statement, the following work is directly supported as project implementation, while standard/course-provided support code should remain distinguished where applicable.

### Bare-metal controller integration

- Implemented a bare-metal control loop on Raspberry Pi 4 that initializes UART and configures GPIO 9, 10, and 11 for SNES controller signaling.
- Implemented the SNES latch/clock/data polling protocol in C.
- Sampled 16 serial controller bits and converted the controller's active-low electrical signals into an active-high 16-bit button-state bitmask.
- Polls controller state at approximately 30 Hz using a 33,333 μs delay.
- Suppresses redundant serial output by transmitting only when the controller state changes.
- Emits controller states as hexadecimal strings over UART for host-side consumption.

### Direct hardware access

- Used volatile pointers to BCM2711 memory-mapped peripheral registers.
- Manipulated GPIO Function Select, Set, Clear, Level, and Pull-Up/Pull-Down registers directly.
- Used the BCM system timer for microsecond-scale busy-wait timing.
- Operated the Raspberry Pi 4 Mini UART through its auxiliary peripheral registers.

### Host integration

- Implemented Python serial code that connects to the Raspberry Pi at 115200 baud.
- Parses UART messages formatted as hexadecimal controller-state values.
- Decodes multiple simultaneous button presses using bit masks.
- Maps SNES controls to slide-puzzle actions including:
  - move up
  - move down
  - move left
  - move right
  - reset
  - solve
  - new game
  - quit

### Pygame integration

- Added SNES-controller handling to a Pygame slide-puzzle application.
- Integrated serial polling into the game's main loop without removing keyboard and mouse control.
- Added a controller-action dispatch layer that validates moves before applying them.
- Reuses the game's existing animation, reset, solve, and board-management functions when responding to controller input.

### Build / debug environment

The supplied project includes a complete bare-metal build/debug environment:
- AArch64 cross-compilation
- freestanding C
- custom startup assembly
- explicit linker memory regions
- binary image generation
- QEMU execution
- SD-card deployment
- GDB/OpenOCD/JTAG debugging

Some or all of these infrastructure files may have originated from course-provided scaffolding. Their presence is important to understanding the environment, but they should not automatically be described as independently authored unless separately confirmed.

---

## Architecture

```text
Physical SNES Controller
       |
       | LATCH / CLOCK / DATA
       v
Raspberry Pi 4 GPIO
       |
       | direct BCM2711 MMIO
       v
Bare-metal C program
       |
       | 16-bit controller state
       | formatted as hexadecimal
       v
Raspberry Pi Mini UART
       |
       | USB serial connection
       v
Host Python / pyserial
       |
       | bitmask -> semantic actions
       v
Pygame Slide Puzzle
```

### Bare-metal execution path

```text
GPU / Pi firmware loads kernel8.img
        ↓
_start in start.s
        ↓
only CPU core 0 continues
        ↓
stack initialized
        ↓
.bss zeroed
        ↓
main()
        ↓
UART + GPIO initialization
        ↓
SNES polling loop
```

### Host execution path

```text
serial.Serial(...)
        ↓
read line from UART
        ↓
validate "0x..." format
        ↓
convert to integer
        ↓
decode button bits
        ↓
dispatch game actions
        ↓
Pygame updates board / animation
```

---

## Technologies

### Languages

- C
- AArch64 assembly
- Python
- GNU linker-script syntax
- Make

### Hardware / Platform

- Raspberry Pi 4 / BCM2711
- ARM64 / AArch64
- SNES controller
- UART serial communication
- GPIO
- JTAG

### Python Libraries

- Pygame
- pyserial

### Toolchain / Development Tools

- GNU AArch64 cross compiler (`aarch64-elf-*`)
- GNU assembler
- GNU linker
- `objcopy`
- `objdump`
- GDB
- OpenOCD
- QEMU `qemu-system-aarch64`

### Protocols / Interfaces

- SNES synchronous serial controller protocol using LATCH / CLOCK / DATA
- UART at 115200 baud
- JTAG
- direct memory-mapped I/O

---

## Features

### SNES controller polling

`get_SNES()`:

1. raises LATCH,
2. waits 12 μs,
3. lowers LATCH,
4. reads 16 controller bits,
5. creates clock edges with 6 μs half-period delays,
6. samples the DATA line,
7. converts active-low button input into set bits in a 16-bit integer.

### GPIO configuration

The program configures:

- GPIO 9 as SNES LATCH output
- GPIO 11 as SNES CLOCK output
- GPIO 10 as SNES DATA input

GPIO configuration is performed through direct register reads, bit masking, and memory-mapped writes.

### State-change filtering

The main bare-metal loop maintains `currentState`.

A new UART message is emitted only when:

```text
data != currentState
```

This avoids continuously retransmitting an unchanged controller state.

### Polling frequency

The bare-metal loop delays:

```text
33,333 microseconds
```

between reads, corresponding to approximately 30 polling cycles per second.

### Multi-button input

The host-side Python code treats controller state as a bitmask rather than a single enum value.

It checks every configured bit:

```python
if hex_value & button_hex:
```

and can therefore identify multiple simultaneous button presses.

### Slide-puzzle controls

The integrated application maps:

| Bit | Action |
| --- | --- |
| `0x0001` | Reset |
| `0x0002` | Solve |
| `0x0004` | Quit |
| `0x0008` | New game |
| `0x0010` | Up |
| `0x0020` | Down |
| `0x0040` | Left |
| `0x0080` | Right |

The smaller serial diagnostic script additionally labels A, X, L, and R bits.

### Multiple input methods

The Pygame game retains:

- mouse input
- keyboard input
- SNES-controller input

Controller input is integrated alongside the existing desktop input paths.

---

## Low-Level / Bare-Metal Implementation

### Memory-mapped GPIO

`gpio.h` defines the BCM2711 peripheral base address as:

```text
0xFE000000
```

and exposes GPIO registers through volatile integer pointers.

The application directly uses:

- `GPFSEL0`
- `GPFSEL1`
- `GPSET0`
- `GPCLR0`
- `GPLEV0`
- `GPPUPPDN0`

No operating-system GPIO abstraction is used by the bare-metal application.

### UART

The supplied UART support directly configures Raspberry Pi Mini UART (UART1).

Initialization includes:

- mapping GPIO 14 and 15 to alternate function 5
- disabling GPIO pulls
- enabling auxiliary Mini UART
- disabling UART interrupts
- selecting 8-bit mode
- enabling and clearing FIFOs
- setting baud divisor 270
- enabling transmitter and receiver

The implementation provides:

- `uart_init`
- `uart_putc`
- `uart_getc`
- `uart_puts`
- `uart_puthex`

Transmission and reception use polling of UART line-status register bits rather than interrupts.

### System timer

`systimer.c` directly reads the BCM system timer's high and low 32-bit counter registers and combines them into a 64-bit value.

It protects against lower-half rollover by re-reading if the high word changes during the read.

`microsecond_delay()` performs a busy-wait until the timer reaches the calculated target.

The code explicitly handles QEMU's lack of this timer emulation by returning immediately if the timer counter is zero.

### Startup code

`start.s` supplies the execution environment normally provided by an OS/runtime.

It:

- exposes `_start`
- reads `mpidr_el1`
- allows only core 0 to continue
- puts other cores into `wfe` loops
- initializes the stack pointer
- clears `.bss`
- branches to C `main()`
- loops forever if `main()` returns

### Linker memory layout

The linker script places the image into explicit Raspberry Pi memory regions:

| Section | Origin | Size |
| --- | ---: | ---: |
| code | `0x80000` | `0x10000` |
| read-only data | `0x90000` | `0x10000` |
| data | `0x100000` | `0x10000` |
| BSS | `0x110000` | `0x10000` |

It places `.text.boot` first, aligns code and BSS appropriately, exports BSS start/end metadata, and discards several non-runtime sections.

---

## Build System

The supplied Makefile targets a freestanding AArch64 environment.

The C compiler flags include:

```text
-Wall -O2 -ffreestanding -nostdinc -nostdlib -nostartfiles
```

The build pipeline is:

```text
C / assembly source
        ↓
AArch64 object files
        ↓
GNU ld + link.ld
        ↓
kernel8.elf
        ↓
objcopy -O binary
        ↓
kernel8.img
```

`objdump` also produces a textual dump for debugging.

### Supported execution/deployment paths

The Makefile includes targets for:

- local QEMU Raspberry Pi 4B emulation
- SD-card deployment
- Compute Module 4 flash deployment
- GDB debugging through OpenOCD/JTAG

The supplied `kernel8.img` is 65,586 bytes.

Its presence verifies that a compiled bare-metal image was retained with the supplied project. The image alone does not establish which exact source revision or toolchain invocation produced it.

---

## JTAG / Debugging

### OpenOCD

`openocd.cfg` loads:

- a custom U of C Pi4 Hat V3 adapter configuration
- the standard OpenOCD Raspberry Pi 4B board configuration

`UofCPi4HatV3.cfg` configures:

- FTDI adapter driver
- 30 MHz adapter speed
- falling-edge TDO sampling
- FTDI VID/PID `0x0403:0x6010`
- MPSSE channel 0
- GPIO layout initialization

### GDB initialization

`gdb_jtag.init`:

1. launches OpenOCD,
2. connects GDB to `localhost:3333`,
3. redirects OpenOCD logs,
4. lists available targets,
5. loads the selected ELF executable into Raspberry Pi memory,
6. exposes a helper `close` command that shuts down OpenOCD and detaches GDB.

This is evidence of a hardware-debugging workflow in the supplied project environment.

---

## Host-Side Python

### Serial diagnostic script

`A4.py` opens the USB serial connection at 115200 baud, validates incoming hexadecimal messages, decodes button-state bit masks, and prints semantic button names.

It recognizes 12 controller bits:

- B
- Y
- Select
- Start
- Up
- Down
- Left
- Right
- A
- X
- L
- R

### Serial monitor

`screen.py` acts as a lightweight serial terminal that reads and prints incoming bytes from the same USB serial device.

The script specifies 115201 baud rather than 115200. The supplied code does not explain whether this was intentional or a typo.

### Pygame integration

The slide-puzzle source contains an explicit attribution header:

```text
Slide Puzzle
By Al Sweigart
Released under a Simplified BSD license
```

Accordingly, the base puzzle/game implementation should not be represented as original work.

Project-specific additions visible in the supplied file include:

- importing `serial`
- serial-port constants
- opening/closing the controller connection
- SNES button-to-action mappings
- `handle_button_press(...)`
- reading and decoding UART data from inside the game loop
- dispatching SNES input to the existing puzzle behavior

---

## External Integrations

There are no web APIs or cloud services.

The meaningful external interfaces are physical/local:

- SNES controller hardware
- Raspberry Pi BCM2711 peripherals
- UART serial bridge
- host computer serial device
- OpenOCD/JTAG debugger interface

---

## Reliability / Failure Handling

### Host serial connection

The Python scripts catch `serial.SerialException` when opening the serial port.

The integrated Pygame application exits if the serial connection cannot be established.

### Malformed serial data

Incoming serial data is processed only when it begins with `"0x"`.

Integer conversion errors are caught with `ValueError`.

### Serial cleanup

The diagnostic scripts and game close the serial device on normal application termination paths.

### Controller-state suppression

The bare-metal loop emits data only when controller state changes, reducing duplicate messages.

### Timer rollover handling

The system-timer read checks for a high-word change while sampling the low word and re-reads to avoid constructing an invalid 64-bit value around rollover.

### QEMU timer limitation

The system-timer delay routine detects a zero timer and returns immediately to avoid an infinite delay loop when running under QEMU.

---

## Security

This is a local embedded/coursework project.

No security model is demonstrated.

There is no:

- authentication
- authorization
- encryption
- network-access control
- remote service
- secret management

The hard-coded serial-device path is a portability/configuration concern rather than a security architecture.

---

## Testing / Quality

No formal automated test suite was supplied.

The project does contain multiple diagnostic/development artifacts:

- `A4.py` for decoding and verifying controller states
- `screen.py` for raw serial monitoring
- UART output from the bare-metal program
- QEMU target in the Makefile
- `kernel8.dump` generation capability
- GDB/OpenOCD/JTAG debugging configuration

These support interactive and hardware-level debugging but should not be described as automated testing.

---

## Deployment / Infrastructure

This project is not deployed as a conventional application service.

The executable artifact is a Raspberry Pi bare-metal boot image:

```text
kernel8.img
```

The build system supports:

- loading the image from Raspberry Pi SD-card boot media
- writing to Compute Module flash
- launching under QEMU for emulation
- loading an ELF into Raspberry Pi RAM via JTAG/GDB

---

## Performance / Scale

No formal performance benchmark was provided.

Directly verifiable implementation values include:

| Metric | Value | Evidence |
| --- | ---: | --- |
| SNES bits sampled per poll | 16 | `get_SNES()` loop |
| Main polling delay | 33,333 μs | `main.c` |
| Approximate polling frequency | 30 Hz | derived from 33,333 μs delay |
| Latch duration | 12 μs | `get_SNES()` |
| Clock half-period | 6 μs | `get_SNES()` |
| UART baud rate | 115200 | `uart.c`, host script |
| Raspberry Pi peripheral MMIO base | `0xFE000000` | `gpio.h` |
| UART GPIO pins | 14 / 15 | `uart.c` |
| SNES LATCH / DATA / CLOCK GPIO | 9 / 10 / 11 | `main.c` |
| Controller-state width | 16 bits | `unsigned short`, 16-sample loop |
| Host-recognized controller bits | 12 | `A4.py` |
| Puzzle board | 4 × 4 | Pygame constants |
| Pygame frame rate | 30 FPS | Pygame constants |
| Retained kernel image size | 65,586 bytes | supplied `kernel8.img` |
| JTAG adapter speed | 30 MHz | `UofCPi4HatV3.cfg` |

The timing constants describe intended software behavior and should not be converted into measured end-to-end latency claims.

---

## Technical Challenges / Complexity

### Bare-metal execution without an operating system

The project operates hardware directly rather than relying on Linux GPIO/UART drivers in the Raspberry Pi application itself.

That requires explicit handling of:

- startup state
- stack initialization
- BSS initialization
- linker memory placement
- peripheral registers
- timing
- UART communication

### Hardware protocol implementation

The SNES controller is read by manually generating latch and clock transitions and sampling the data line with microsecond timing.

### Crossing hardware/software boundaries

The project spans:

1. controller hardware,
2. Raspberry Pi bare-metal firmware,
3. UART transport,
4. host serial parsing,
5. Python event dispatch,
6. graphical game behavior.

This creates a clear multi-layer integration path.

### Active-low input conversion

The physical controller signal is treated as active-low, while the software bitmask exposes pressed buttons as set bits. The polling routine performs that conversion explicitly.

### Combining existing software with custom hardware input

The graphical slide puzzle is third-party base code rather than a custom game implementation. The technically relevant contribution is integrating a new hardware input path into that existing application while retaining keyboard and mouse behavior.

### Low-level debugging setup

The project environment supports both software emulation through QEMU and on-target debugging through JTAG/OpenOCD/GDB, allowing inspection below the application level.

---

## Documentation / Operational Support

The low-level C, assembly, linker, Makefile, UART, and timer files contain extensive inline documentation explaining:

- BCM2711 register addresses
- UART initialization
- system timer behavior
- startup state
- memory layout
- build targets
- QEMU execution
- SD-card deployment
- JTAG/OpenOCD debugging

Some of this documentation appears to be standard/course infrastructure material and should not automatically be attributed as independently authored.

---

## Quantifiable Evidence

| Metric | Value | Evidence |
| --- | ---: | --- |
| Bare-metal controller samples | 16 bits per poll | `main.c:get_SNES` |
| GPIO lines dedicated to SNES protocol | 3 | GPIO 9, 10, 11 |
| Main loop polling target | ~30 Hz | 33,333 μs delay |
| Host controller mappings in diagnostic script | 12 | `A4.py` action table |
| Puzzle controller actions integrated | 8 | `slidepuzzle-original.py` action table |
| UART speed | 115200 baud | `uart.c`, `A4.py`, game |
| Explicit linker memory regions | 4 | text, rodata, data, BSS |
| Worker CPU cores intentionally parked at startup | 3 on Pi 4 | `_start` only continues on core 0 |
| Retained boot image | 65,586 bytes | `kernel8.img` |
| JTAG clock setting | 30 MHz | `UofCPi4HatV3.cfg` |

---

## Evidence Map

### Claim: the Raspberry Pi directly polls an SNES controller through GPIO

**Evidence:**

- `main.c`
  - GPIO 9 LATCH
  - GPIO 11 CLOCK
  - GPIO 10 DATA
  - `get_SNES()`
- `gpio.h`
  - BCM2711 GPIO MMIO register definitions

### Claim: controller state is transmitted from the Pi over UART

**Evidence:**

- `main.c`
  - `uart_init()`
  - `uart_puts()`
  - `uart_puthex()`
- `uart.c`
  - Mini UART configuration and transmit functions

### Claim: the firmware is a bare-metal AArch64 program

**Evidence:**

- `start.s`
  - `_start`
  - core selection
  - stack setup
  - BSS clearing
  - branch to C `main`
- `link.ld`
  - fixed executable memory map
- `Makefile`
  - `-ffreestanding`
  - `-nostdinc`
  - `-nostdlib`
  - `-nostartfiles`
  - creation of `kernel8.img`

### Claim: SNES controller input controls the host-side slide puzzle

**Evidence:**

- `slidepuzzle-original.py`
  - SNES action mapping
  - serial initialization
  - controller polling in game loop
  - `handle_button_press()`

### Claim: the base slide-puzzle implementation is third-party

**Evidence:**

- `slidepuzzle-original.py`
  - file header credits Al Sweigart
  - Simplified BSD license notice

### Claim: the project supports hardware debugging via JTAG

**Evidence:**

- `openocd.cfg`
- `UofCPi4HatV3.cfg`
- `gdb_jtag.init`
- Makefile `gdb` target

### Claim: the system timer provides microsecond delays

**Evidence:**

- `systimer.c`
  - BCM timer MMIO definitions
  - 64-bit counter read
  - `microsecond_delay()`

---

## Git / Development History

Git history was not supplied and is not needed to establish the current implementation.

No claims are made about:

- commit history
- development chronology
- branch structure
- authorship of standard/course scaffolding

---

## Uncertain / Not Verifiable

The supplied material does not establish:

- exact course-assignment requirements,
- which low-level scaffolding files were instructor-provided versus independently written,
- exact development dates,
- exact Raspberry Pi hardware revision beyond code/configuration targeting Pi 4 / BCM2711,
- exact SNES controller model,
- measured end-to-end input latency,
- controller electrical timing validation,
- automated-test coverage,
- production use,
- number of users,
- whether the supplied kernel image was built from the exact supplied source snapshot,
- whether every Makefile target was used in practice,
- whether JTAG debugging was actually exercised versus configured,
- whether QEMU execution was used successfully,
- whether all host scripts were final rather than diagnostic/intermediate tools.

The omitted standard `requirements.txt` and `systimer.h` are acknowledged but not reconstructed.

---

## Questions Requiring External Context

1. Which files were supplied as course scaffolding versus written or substantially modified by the developer?
2. Was `main.c` entirely original implementation for the assignment?
3. Was the serial/Pygame integration explicitly required or independently designed?
4. Was the project demonstrated on physical Raspberry Pi 4 hardware?
5. Was the SNES controller connected through a custom Pi hat or breadboard/interface?
6. Was JTAG/OpenOCD used during development?
7. Were any timing or responsiveness measurements recorded?
8. Was the Pygame file based directly on the upstream Al Sweigart version before the SNES integration was added?
9. Were there assignment specifications or demonstration videos that should be retained as supporting evidence?

---

## Additional Technical Details

### Third-party code boundary

The Pygame file must not be represented as an entirely original game implementation.

The file explicitly attributes the slide puzzle to Al Sweigart. The defensible contribution is the serial/SNES integration and any clearly project-specific modifications, not the underlying puzzle engine.

### Standard support-file boundary

The low-level project includes extensive build, startup, UART, timer, linker, and debugging support. Because the developer specifically identified some environment files as standard and the style/comments of several low-level files resemble reusable instructional infrastructure, authorship of those support files should remain separate from claims about the project's custom logic unless independently confirmed.

### Generated artifact

`kernel8.img` is a compiled binary artifact, not source code. Its retained size is verifiable, but it should not be counted as an independently implemented feature.

### Host serial configuration

`A4.py` and the integrated game use 115200 baud.

`screen.py` specifies 115201 baud. That difference is preserved as an implementation detail rather than silently corrected.

---

## Final Technical Record

The project demonstrates an end-to-end hardware/software integration in which a Raspberry Pi 4 runs freestanding bare-metal code to communicate directly with an SNES controller through BCM2711 GPIO registers. The firmware implements latch/clock/data signaling, microsecond timing, active-low button decoding, state-change filtering, and Mini UART output.

Controller state is transmitted to a host computer, where Python and pyserial decode the hexadecimal bitmask. That input is integrated into a Pygame slide-puzzle application, mapping physical SNES buttons to puzzle navigation and game commands.

The supplied environment further demonstrates the mechanics required to build and debug a Raspberry Pi bare-metal image: AArch64 startup assembly, explicit linker memory placement, freestanding cross-compilation, `kernel8.img` generation, QEMU execution support, and GDB/OpenOCD/JTAG configuration.

The strongest supported technical themes are:

- bare-metal embedded programming,
- direct memory-mapped I/O,
- GPIO protocol implementation,
- UART serial communication,
- ARM64/AArch64 startup and linking,
- hardware timing,
- hardware/software integration,
- Python serial parsing,
- Pygame event integration,
- cross-compilation,
- emulation,
- on-target debugging.

Claims about authorship of generic low-level scaffolding should remain conservative unless separately confirmed, while the SNES polling/application logic and serial game integration are directly visible as the central project-specific implementation.
