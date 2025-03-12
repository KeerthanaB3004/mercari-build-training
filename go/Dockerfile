FROM golang:1.24.0-alpine3.20

RUN addgroup -S mercari && adduser -S trainee -G mercari

ENV CGO_ENABLED=1

RUN apk add --no-cache gcc musl-dev sqlite

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN chown -R trainee:mercari db 


USER trainee


CMD ["go", "run", "cmd/api/main.go"]
