# Sklep Type of Web

## Uruchomienie
1. W folderze repozytorium wpisz `yarn`, aby zainstalować wszystkie potrzebne zależności.
2. Aby uruchomić API będziesz potrzebować dockera (polecenie `docker-compose` musi być dostępne).
3. Uruchom frontend i backend jedną komendą `yarn dev`
4. Do pliku `/etc/hosts` (lub `c:\Windows\System32\Drivers\etc\hosts`) dodaj dwie linijki:
```
127.0.0.1 api.sklep.localhost
127.0.0.1 www.sklep.localhost
```
5. Aplikacja będzie dostępna pod adresem http://www.sklep.localhost:3000/ a API pod http://api.sklep.localhost:3002/

## Zasady

### Stack:
- Next.js (SSG), TypeScript
- Node.js, Hapi, Prisma, TypeScript

### Współpraca:
- Pracujemy w repo na branchach, których nazwy odpowiadają numerom tasków.
- Robimy pull requesty do brancha `develop`.

### Tablica zadań:
- <https://github.com/typeofweb/sklep/projects/1>
