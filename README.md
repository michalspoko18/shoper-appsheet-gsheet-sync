# Shoper AppSheet Google Sheets Sync

Integracja synchronizująca dane produktów między platformą e-commerce Shoper a arkuszami Google z możliwością wykorzystania w AppSheet.

## Opis

Narzędzie umożliwia masową aktualizację cen produktów (regularnych, hurtowych i specjalnych) w sklepie Shoper za pomocą API REST. Dane są najpierw wprowadzane lub importowane do arkusza Google, a następnie przenoszone do Shoper dzięki skryptom Google Apps Script.

## Funkcje

- Masowa aktualizacja cen produktów w Shoper
- Obsługa trzech typów cen: regularne, hurtowe i specjalne
- Automatyczne przetwarzanie wielu produktów w partiach po 25
- Pełna integracja z Google Sheets
- Obsługa limitów API Shoper z automatycznym opóźnieniem przy zbliżaniu się do limitu
- Zwrotne raportowanie kodów odpowiedzi z API

## Wymagania

- Konto Google z dostępem do Google Sheets i Google Apps Script
- Sklep na platformie Shoper z aktywnym API
- Dane uwierzytelniające do API Shoper (Bearer Token)

## Instalacja

1. Utwórz nowy arkusz Google Sheets
2. Przejdź do Extensions > Apps Script
3. Skopiuj kod z pliku `ImportShoper.gs` do edytora skryptów
4. Zaktualizuj zmienną `BASE_URL` w kodzie, aby wskazywała na adres URL Twojego sklepu Shoper
5. Skonfiguruj funkcję `postToken()` do pobierania tokenu uwierzytelniającego

## Struktura arkusza

Arkusz powinien zawierać następujące kolumny:
- A: ID produktu
- B: Nowa cena regularna
- C: Nowa cena hurtowa
- D: Nowa cena specjalna
- E: Kod odpowiedzi API (wypełniany automatycznie)

## Użycie

1. Wypełnij arkusz danymi produktów do aktualizacji
2. Uruchom funkcję `bulkList()` z poziomu edytora skryptów lub przycisku w arkuszu
3. Skrypt przetworzy wszystkie produkty i zaktualizuje kolumnę E kodami odpowiedzi z API

## Licencja

Ten projekt jest udostępniany na licencji [MIT](https://opensource.org/licenses/MIT).

## Autor

Michał Walczak

---

*Uwaga: To narzędzie nie jest oficjalnym produktem firmy Shoper i zostało stworzone jako niezależna integracja.*