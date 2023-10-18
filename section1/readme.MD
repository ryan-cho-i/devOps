1. Download Redis Image

   > docker pull redis

2. Start Redis Container

   > docker run --name redis -d -p 6379:6379 redis

3. Check Container Name and Port

   > docker ps

4. Get Container IP Address

   > docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' redis

5. Go inside of container

> docker exec -it redis /bin/bash
> redis-cli
