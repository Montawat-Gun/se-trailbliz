# Use the official Golang image as a parent image
FROM golang:1.18-buster

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum for dependency management
COPY go.mod go.sum ./

# Download any dependencies
RUN go mod download

# Copy the rest of your application's source code
COPY . .

# Build your application
RUN go build -o myapp ./cmd/api/main.go

# Expose the port your app runs on
EXPOSE 5004

# Run the binary
CMD ["./myapp"]
