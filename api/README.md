# 🌱 API Fastify + Prisma + TypeScript 

API backend moderne construite avec :

- [Fastify](https://www.fastify.io/)
- [Prisma ORM](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Commandes de développement

### Démarrer l’API en mode dev (reload automatique)
```bash
npm run dev
```

### Compiler TypeScript
```bash
npm run build
```

### Démarrer l’API compilée (prod)
```bash
npm start
```

---

## 🛠 Commandes Prisma (via npm scripts)

### Générer le client Prisma
```bash
npm run prisma:generate
```

### Ouvrir Prisma Studio (interface admin web)
```bash
npm run prisma:studio
```

---

## ⚙️ Configuration `.env` (exemple)

Crée un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/nom_de_la_bdd"
```
