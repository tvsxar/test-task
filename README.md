## Movie App

## Опис

Додаток на React для перегляду та керування списком фільмів. Використовує зовнішній бекенд API для збереження даних.
## Встановлення та запуск локально
1.	Клонувати репозиторій:
```
git clone https://github.com/tvsxar/test-task.git
cd movie-app
```

2.	Створити файл .env у корені проєкту і вказати URL API бекенду:
```
VITE_API_URL=http://localhost:8000/api/v1
```

3.	Встановити залежності:
```
npm install
```
4.	Запустити додаток:
```
npm run dev
```

## Запуск через Docker
### Крок 1. Запустити бекенд (API):
```
docker run -d -p 8000:8000 webbylabhub/movies
```

### Крок 2. Запустити фронтенд:
```
docker run -p 3000:80 -e VITE_API_URL=http://localhost:8000/api/v1 tvsxar/movie-app
```

## Запуск через DockerHub
Образ доступний у DockerHub за адресою:
tvsxar/movie-app:latest

Для запуску образу з DockerHub:
```
docker pull tvsxar/movie-app:latest
docker run --name movies -p 3000:80 -e VITE_API_URL=http://localhost:8000/api/v1 tvsxar/movie-app:latest
```
## Конфігурація
Змінна оточення VITE_API_URL визначає URL бекенд API. Це дозволяє змінювати адресу API без зміни коду.
