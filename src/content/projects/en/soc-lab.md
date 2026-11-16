---
order: 1
title: "SOC Lab: attack detection in a segmented network"
subtitle: "A lab SOC simulating a company network with a SIEM, VPN and six simulated attacks"
period: "March 2026"
type: school
duration: "approx. 35 hours over 2 weeks"
role: "TODO: role in the project (e.g. solo project)"
tech: ["Wazuh 4.9.2", "WireGuard", "VMware Workstation", "Ubuntu 22.04", "Kali Linux", "Fail2ban", "PostgreSQL", "Flask"]
summary: "A lab SOC simulating a company network: 4 virtual machines, 3 network zones, a SIEM and 6 simulated attacks. Brute force was caught and blocked automatically, the port scan was not, and here is why."
keyFinding: "A log-based SIEM cannot see network reconnaissance: the port scan raised no alert. Without an IDS (e.g. Suricata) the first stage of an attack stays invisible."
github: "TODO: URL of the SOC Lab GitHub repository"
pdf: "TODO: SOC Lab PDF documentation (file goes to public/docs/soc-lab.pdf, then write /docs/soc-lab.pdf here)"
diagram: soc-network
---

## Problem

How do you find out that an attack is under way in a small company network, and how quickly can you respond? A small company usually has no security team of its own, so detection and the first response have to be as automated as possible.

## Solution

I built a scaled-down company network in VMware Workstation and put a SIEM on top of it. Then I ran six attack scenarios against it from Kali Linux and watched what the SIEM caught.

### Network segmentation

The network is split into three zones:

- **External network:** simulates the internet, VMnet1 `192.168.1.0/24`.
- **DMZ with a VPN gateway:** the gateway is dual-homed (it has an interface in both networks) and enforces firewall rules between the zones.
- **Internal network:** critical systems, VMnet2 `10.0.0.0/24`.

Remote access to the internal network goes only through a WireGuard tunnel on the VPN gateway.

### Monitoring and response

- **Wazuh all-in-one** on Ubuntu 22.04: log collection from every machine and real-time alerts.
- **File integrity monitoring** of critical files on the servers.
- **Fail2ban** to block IP addresses automatically after repeated failed logins.

### Virtual machines

| Machine | RAM | Role |
|---|---|---|
| SIEM server | 6 GB | Wazuh all-in-one (Ubuntu 22.04) |
| VPN gateway | 2 GB | Dual-homed, firewall |
| DB server | 4 GB | PostgreSQL + Flask API |
| Kali Linux | 3 GB | Penetration testing |

## Results

| Attack | Result |
|---|---|
| SSH brute force | Detected and blocked automatically |
| Port scan | Not detected (limit of a log-based SIEM) |
| SQL injection | Endpoint held up |
| Change of critical files | Detected within 5 minutes |
| Data exfiltration | Succeeded, API had no authentication |
| Privilege escalation | Detected, but late |

Detection summary and false positive rate: `TODO: verified numbers – share of detected / partially detected / undetected attacks and the false positive rate (the source notes say 43 % / 29 % / 29 %, which adds up to 101 %, and 38 % false positives; needs to be reconciled)`

## Limitations and what I would do differently

- **The SIEM detects, it does not prevent.** Apart from brute force, which Fail2ban stops, it only reports the attack. The response is still up to a human.
- **A log-based approach cannot see network reconnaissance.** A port scan leaves nothing in the logs for Wazuh to pick up. Next time I would add an IDS such as Suricata, which reads the traffic itself.
- **Exfiltration worked because the API had no authentication.** That is not a detection failure but an application design flaw. The Flask API should require authentication and limit who can read which data.
- **The rules need tuning.** The false positive rate was high. Without tuning, in real operation people would quickly stop reading the alerts.

## What I learned

How to deploy and configure a SIEM, split a network into zones, set up a VPN and go through the basics of incident response. Above all I learned that detection numbers have to be read critically: "detected" does not mean "in time", and "not detected" can mean the tool has no visibility into that kind of attack at all.
