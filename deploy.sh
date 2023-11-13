#!/bin/sh
git pull
npx prisma generate
npm run build
pm2 restart api