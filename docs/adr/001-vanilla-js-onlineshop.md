# ADR-001: Vanilla JavaScript für Onlineshop-Frontend

**Status:** Accepted  
**Datum:** 2025

## Kontext
Der Onlineshop ist ein Lern- und Demonstrationsprojekt für Grundlagen des Web-Developments.

## Entscheidung
Vanilla HTML, CSS und JavaScript ohne Framework für den Onlineshop.

## Abgewogene Alternativen
- **React/Vue:** Überdimensioniert für Lern-/Demoprojekt
- **Shopify/WooCommerce:** Keine eigene Code-Kontrolle

## Konsequenzen
**Positiv:**
- Demonstriert Grundkenntnisse in purem Web-Development
- Kein Framework-Overhead
- Einfach zu verstehen und zu warten

**Negativ:**
- Kein State Management für Warenkorb-Persistenz
- Manuelles DOM-Manipulation
