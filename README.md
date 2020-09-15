# Sklep Type of Web

Projekt edukacyjny. Licencja: [AGPL](./LICENSE)

## Uruchomienie

1. Aby uruchomić API będziesz potrzebować dockera (polecenie `docker-compose` musi być dostępne, port 5432 musi być wolny).
2. Uruchom frontend i backend jedną komendą `yarn dev`. Automatycznie zostaną zainstalowane też potrzebne zależności.
3. Do pliku `/etc/hosts` (lub `c:\Windows\System32\Drivers\etc\hosts`) dodaj dwie linijki:

```
127.0.0.1 api.sklep.localhost
127.0.0.1 www.sklep.localhost
```

4. Aplikacja będzie dostępna pod adresem http://www.sklep.localhost:3000/ a API pod http://api.sklep.localhost:3002/

## Zasady

### Zarys architektury

Aplikacja dzieli się na 2 części:

1. Odpowiedzialną za zarządzanie produktami, dodawanie, edycję, ustalanie cen – nazwiemy ją Admin
2. Sklep z perspektywy klienta: przeglądanie produktów, dodawanie do koszyka, zakup – nazwiemy ją Klient

### Stack

- Admin
  - API:
    - Node.js
    - [Hapi](https://hapi.dev)
    - [Prisma](https://www.prisma.io/docs/getting-started/quickstart)
    - [PostgreSQL](https://www.postgresql.org/)
    - TypeScript
  - WWW:
    - [Next.js](https://nextjs.org) bez SSG ani SSR (nie potrzebujemy tego w Adminie)
~
    - ~[React Hook Form](https://react-hook-form.com) do obsługi formularzy~ nie działało to zbyt dobrze z Carbon
    - [React Final Form](https://final-form.org/react) do obsługi formularzy
    - [Carbon Design System](https://www.carbondesignsystem.com/components/overview) (gotowe komponenty)
    - TypeScript
    - SCSS
- Klient
  - API:
    - To samo API, tylko inne endpointy
  - WWW:
    - [Next.js z SSG](https://nextjs.org/docs/basic-features/data-fetching) do większości elementów.
      - Incremental Static Regeneration
      - ~Warto rozważyć bezpośrednie wbicie się do bazy z poziomu `getStaticProps`~
      - [React Query](https://react-query.tanstack.com/docs/overview) dobrze [działa z SSR](https://react-query.tanstack.com/docs/guides/ssr)
    - TypeScript
    - TailwindCSS
    - SCSS

### Styleguide

- Strony (Pages)

```tsx
export default function AdminHome() {
  return <div>AdminHome</div>;
}
```

- Komponenty

```tsx
export const ProductList = React.memo<Props>((props) => {
  return <div>ProductList</div>;
});
ProductList.displayName = 'ProductList';
```

### Współpraca

- Pracujemy w repo na branchach, których nazwy odpowiadają numerom tasków.
- Robimy pull requesty do brancha `develop`.

### Tablica zadań

- <https://github.com/typeofweb/sklep/projects/1>
