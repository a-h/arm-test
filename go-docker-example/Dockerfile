# See https://docs.docker.com/language/nodejs/run-tests/
FROM golang:latest AS build

WORKDIR /app
COPY . .
RUN go build -o entrypoint

FROM ubuntu:latest as run
COPY --from=build /app/entrypoint ./
EXPOSE 3000
ENTRYPOINT [ "/entrypoint" ]
