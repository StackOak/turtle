# Turtle Docker Setup

docker run -d \
  --name turtle \
  -p 8000:8000 \
  -v /var/lib/docker/turtle/tmp/turtle_uploads:/var/tmp/turtle_uploads \
  --restart unless-stopped \
  turtle
