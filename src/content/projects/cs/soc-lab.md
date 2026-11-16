---
order: 1
title: "SOC Lab: detekce útoků v segmentované síti"
subtitle: "Laboratorní SOC simulující firemní síť se SIEM, VPN a šesti simulovanými útoky"
period: "březen 2026"
type: school
duration: "cca 35 hodin za 2 týdny"
role: "TODO: role v projektu (např. samostatná práce)"
tech: ["Wazuh 4.9.2", "WireGuard", "VMware Workstation", "Ubuntu 22.04", "Kali Linux", "Fail2ban", "PostgreSQL", "Flask"]
summary: "Laboratorní SOC simulující firemní síť: 4 virtuální stroje, 3 síťové zóny, SIEM a 6 simulovaných útoků. Brute force zachycen a automaticky zablokován, port scan ne, a proč."
keyFinding: "SIEM postavený na logech nevidí síťový průzkum: port scan prošel bez alertu. Bez IDS (např. Suricata) zůstává první fáze útoku neviditelná."
github: "TODO: URL GitHub repozitáře SOC Labu"
pdf: "TODO: PDF dokumentace SOC Labu (soubor do public/docs/soc-lab.pdf, sem pak napiš /docs/soc-lab.pdf)"
diagram: soc-network
---

## Problém

Jak v malé firemní síti zjistit, že probíhá útok, a jak rychle na něj reagovat. Malá firma většinou nemá vlastní bezpečnostní tým, takže detekce i první reakce musí běžet co nejvíc automaticky.

## Řešení

Postavil jsem ve VMware Workstation zmenšenou firemní síť a nad ní SIEM. Pak jsem na ni z Kali Linuxu pustil šest útočných scénářů a sledoval, co SIEM zachytí.

### Segmentace sítě

Síť je rozdělená do tří zón:

- **Externí síť:** simulace internetu, VMnet1 `192.168.1.0/24`.
- **DMZ s VPN bránou:** brána je dual-homed (má rozhraní v obou sítích) a vynucuje firewallová pravidla mezi zónami.
- **Interní síť:** kritické systémy, VMnet2 `10.0.0.0/24`.

Vzdálený přístup do interní sítě vede jen přes WireGuard tunel na VPN bráně.

### Monitoring a reakce

- **Wazuh all-in-one** na Ubuntu 22.04: sběr logů ze všech strojů a real-time alerty.
- **File integrity monitoring** kritických souborů na serverech.
- **Fail2ban** pro automatické blokování IP adres po opakovaných neúspěšných přihlášeních.

### Virtuální stroje

| Stroj | RAM | Role |
|---|---|---|
| SIEM server | 6 GB | Wazuh all-in-one (Ubuntu 22.04) |
| VPN gateway | 2 GB | Dual-homed, firewall |
| DB server | 4 GB | PostgreSQL + Flask API |
| Kali Linux | 3 GB | Penetrační testy |

## Výsledky

| Útok | Výsledek |
|---|---|
| SSH brute force | Detekováno a automaticky zablokováno |
| Port scan | Nedetekováno (limit SIEM založeného na logách) |
| SQL injection | Endpoint odolal |
| Změna kritických souborů | Detekováno do 5 minut |
| Exfiltrace dat | Úspěšná, chybějící autentizace API |
| Eskalace oprávnění | Detekováno, ale pozdě |

Souhrn detekce a false positive rate: `TODO: ověřená čísla – podíl detekovaných / částečně detekovaných / nedetekovaných útoků a false positive rate (původní podklady uvádí 43 % / 29 % / 29 %, což dává součet 101 %, a 38 % false positive; nutno sjednotit)`

## Limity a co bych udělal jinak

- **SIEM detekuje, ale nebrání.** Kromě brute force, který zastaví Fail2ban, útok jen nahlásí. Reakce je pořád na člověku.
- **Log-based přístup nevidí síťový průzkum.** Port scan nezanechá v logech nic, čeho by se Wazuh chytil. Příště bych do sítě přidal IDS, třeba Suricatu, která čte přímo provoz.
- **Exfiltrace prošla kvůli chybějící autentizaci API.** To není chyba detekce, ale návrhu aplikace. Flask API by mělo vyžadovat autentizaci a omezovat, kdo smí číst jaká data.
- **Pravidla potřebují ladění.** Podíl false positive byl vysoký. Bez ladění by v reálném provozu alerty rychle přestal někdo číst.

## Co jsem se naučil

Nasadit a nakonfigurovat SIEM, rozdělit síť do zón, nastavit VPN a projít základy incident response. Hlavně jsem ale zjistil, že čísla z detekce je potřeba číst kriticky: „detekováno“ ještě neznamená „včas“ a „neodhaleno“ může znamenat, že nástroj na daný typ útoku vůbec nemá oči.
