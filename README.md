## Movie App

## Опис

Додаток на React для перегляду та керування списком фільмів. Використовує зовнішній бекенд API для збереження даних.
## Встановлення та запуск локально
	1.	Клонувати репозиторій:

git clone https://github.com/tvsxar/movie-app.git
cd movie-app

	2.	Створити файл .env у корені проєкту і вказати URL API бекенду:

VITE_API_URL=http://localhost:8000/api/v1

 	3.	Встановити залежності:

npm install

 	4.	Запустити додаток:

npm run dev

## Збірка Docker образу
	1.	Зібрати образ:
     
docker build -t tvsxar/movies .

	2.	Запустити контейнер:

docker run --name movies -p 3000:80 -e VITE_API_URL=http://localhost:8000/api/v1 tvsxar/movies

## Запуск через DockerHub
Образ доступний у DockerHub за адресою:
tvsxar/movies:latest

Для запуску образу з DockerHub:

docker pull tvsxar/movies:latest
docker run --name movies -p 3000:80 -e VITE_API_URL=http://localhost:8000/api/v1 tvsxar/movies:latest

## Конфігурація
Змінна оточення VITE_API_URL визначає URL бекенд API. Це дозволяє змінювати адресу API без зміни коду.
