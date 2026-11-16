---
order: 2
title: "Smart Lock: face recognition access control"
subtitle: "A Raspberry Pi door lock that unlocks by face and logs every attempt"
period: "January–May 2026"
type: school
duration: "TODO: time spent (e.g. approx. 60 hours over 5 months)"
role: "TODO: role in the project (e.g. hardware + backend)"
tech: ["Raspberry Pi 4", "Pi Camera 3", "Python", "FastAPI", "OpenCV", "face_recognition (dlib)", "React", "MariaDB", "systemd"]
summary: "A door lock that opens when it recognises your face. Camera, an electromagnetic lock driven over GPIO, an admin dashboard and a log of every attempt with a photo."
keyFinding: "TODO: one key finding (e.g. recognition latency on a Pi 4, or whether the lock can be fooled by a photo on a phone)"
github: "TODO: URL of the Smart Lock GitHub repository"
diagram: smart-lock-flow
photos:
  - caption: "The lock by the door: camera and touchscreen"
    todo: "TODO: photo of the lock mounted by the door (file goes to src/assets/projects/smart-lock/, then fill in src and alt)"
  - caption: "Admin dashboard with access history"
    todo: "TODO: screenshot of the admin dashboard (file goes to src/assets/projects/smart-lock/, then fill in src and alt)"
---

## Problem

Keyless access to a room, with a record of who came in and when. Keys get lost or lent out, and a normal lock cannot tell you who opened the door.

## Solution

The whole system runs on a single Raspberry Pi 4 next to the door. The camera captures a face, the backend compares it with stored templates and, depending on the result, unlocks an electromagnetic lock over GPIO. Every attempt is written to the database together with a photo.

### Hardware

- Raspberry Pi 4 and Pi Camera 3.
- 7" touchscreen by the door.
- Electromagnetic lock controlled over GPIO.

### Software

- **Backend:** Python + FastAPI as a REST API between the frontend and the hardware.
- **Recognition:** OpenCV + the face_recognition library (dlib), matching against the templates of enrolled users.
- **Frontend:** React, a touch interface by the door and an admin dashboard for managing users and browsing access history.
- **Database:** MariaDB, a log of every attempt with a photo and a timestamp.
- **Operation:** on boot the Pi starts systemd services and Chromium in full-screen kiosk mode, so the device runs without anyone touching it.

### Challenges

- **BGR ↔ RGB colour conversion:** OpenCV returns frames in BGR, face_recognition expects RGB, so every frame has to be converted before recognition.
- **Real-time performance:** face detection had to be optimised so the Pi 4 could keep up with the live camera feed.
- **Touchscreen interface:** large controls and simple screens that work with a finger.

## Results

The system works and unlocks for authorised people. Every entry attempt can be looked up in the admin dashboard, photo included.

| Metric | Value |
|---|---|
| Unlock latency | `TODO: time from arrival to unlock (e.g. average over N attempts)` |
| Recognition success rate | `TODO: share of authorised people recognised correctly` |
| False attempts | `TODO: how many unauthorised attempts were rejected / let through` |

## Limitations and what I would do differently

`TODO: honest limitations – e.g. resistance to a photo of a face on a phone (no liveness detection), where and how the biometric data is stored and who can access it, how the lock behaves during a power or network outage`

## What I learned

How to connect hardware, a backend and a frontend into one system that runs on its own. How to drive peripherals over GPIO and deploy an application on Linux as a service that survives a reboot.
