---
project_id: bare-metal-raspberry-pi-controller
name: "Bare-Metal Raspberry Pi 4 SNES Controller / Slide Puzzle Integration"
dates: "Jan. 2024 - Apr. 2024"
categories: ["Embedded systems", "Bare-metal programming", "Hardware/software integration"]
technologies: ["C", "AArch64 assembly", "Python", "Raspberry Pi 4", "BCM2711", "GPIO", "Mini UART", "pyserial", "Pygame", "Make", "GNU AArch64 toolchain", "GDB", "OpenOCD", "JTAG", "QEMU"]
evidence:
  - evidence/bare-metal-raspberry-pi-controller/PROJECT_ANALYSIS.md
---

> Transfer source: `Resume_Builder/projects/bare-metal-raspberry-pi-controller.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **canonical-record**. Original provenance, uncertainty, and time qualifications remain applicable. See the collection README and GAPS.md before using claims.

# Overview

Freestanding Raspberry Pi 4 firmware polls a physical SNES controller through BCM2711 GPIO and transmits changed button states over Mini UART. Host-side Python decodes those messages and dispatches actions in a Pygame 4×4 slide puzzle. The firmware operates without an OS; the host game uses a desktop Python environment.

Original project-specific logic is attributed under the ownership statement recorded in the evidence. Low-level scaffolding and the third-party puzzle have separate attribution boundaries.

# Core Contributions

- SNES latch/clock/data polling in C through volatile MMIO register access: GPIO 9 latch, 11 clock, and 10 data. Sixteen active-low samples become a 16-bit active-high button bitmask.
- State-change filtering emits hexadecimal UART messages only when button state changes, with microsecond timing between polls and signaling transitions.
- Python/pyserial parsing checks hexadecimal messages, decodes simultaneous button presses, and maps eight game actions: movement, reset, solve, new game, and quit. The diagnostic decoder recognizes twelve button bits.
- Serial polling/action dispatch integrates into the existing game loop alongside keyboard/mouse control. Movement is validated before invoking existing puzzle behavior.

# Architecture / Technical Design

SNES controller → direct GPIO polling → hexadecimal Mini UART output → host serial parser → button/action dispatch → existing Pygame puzzle.

The supplied environment includes AArch64 startup that parks other cores, initializes the stack, clears BSS, and enters C; explicit code/read-only/data/BSS linker regions; GPIO/Mini UART support; and system-timer busy waits. UART support polls status registers rather than using interrupts. The 64-bit timer read checks high-word changes around rollover; a zero-counter fallback returns immediately for the documented QEMU timer limitation. Independent authorship of this support material is unconfirmed.

The Makefile cross-compiles freestanding C/assembly, links an ELF, and generates kernel8.img. QEMU, SD-card/Compute Module loading, and GDB/OpenOCD/JTAG targets are configured. Their presence establishes supplied capabilities, not successful use of every target.

# Scale / Metrics

- **16 bits per poll**, with a **33,333 μs** loop delay corresponding to an approximate **30 Hz** target. This is timing configuration, not measured input latency or verified electrical timing.
- **12 μs** latch and **6 μs** clock half-period delays.
- Firmware, diagnostic decoder, and game use **115200 baud**.
- Host game is a **4×4** puzzle with eight controller actions; the underlying board/game behavior is third-party.

# Testing / Validation

UART output, semantic serial decoder, raw serial monitor, QEMU target, disassembly generation, and GDB/OpenOCD/JTAG configuration support interactive diagnostics. No formal automated suite or recorded hardware timing validation was supplied. A retained boot image does not establish correspondence to the exact analyzed source. Successful physical demonstrations, QEMU execution, and actual JTAG use remain unverified by the analysis.

# Reliability / Failure Handling

Host scripts catch serial-open errors; the game exits if connection fails. Prefix checks and integer-conversion handling reject selected malformed messages. Normal termination closes serial devices. Changed-state filtering suppresses redundant output; timer rollover and zero-counter handling belong to the supplied support code.

# Limitations / Attribution Boundaries

- Al Sweigart's Simplified BSD puzzle supplies animation, board management, reset, and solve behavior. The supported custom contribution is serial/SNES integration, not an original game engine.
- Startup, UART, timer, linker, Makefile, and debugger support may be course-provided. Their use is supported; independent authorship is unconfirmed. Omitted requirements.txt and systimer.h were explicitly identified as standard support material and are not reconstructed.
- Controller/UART execution uses polling and busy waits. The original seed's broader hardware-interrupt and “from scratch” support-code claims are not independently corroborated here.
- The raw monitor specifies 115201 baud, unlike the other 115200 configurations; intent is unexplained. Host serial paths are hardcoded.
- No measured latency, adoption/users, production deployment, or performance outcome is established.

# Notes

January–April 2024 dates and the broader title “Raspberry Pi Bare-Metal Systems Programming” derive from the owner-supplied resume seed on 2026-10-07, not dates verified by the analysis. That seed reports physical-device UART debugging; specific sessions/results remain uncorroborated. Whether its broad title includes other assignments is unresolved. This record ingests the SNES-controller evidence without inventing additional implementations.

Evidence sections: Contributions; Low-Level / Bare-Metal Implementation; Build System; JTAG / Debugging; Host-Side Python; Reliability / Failure Handling; Uncertain / Not Verifiable. Internal paths in the evidence refer to the investigated workspace, not additional artifacts asserted to be stored here.
