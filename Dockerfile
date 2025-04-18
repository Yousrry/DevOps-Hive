FROM python:3.9-slim AS builder

LABEL maintainer="Mohammed yousry"
# Set the working directory
WORKDIR /app
# Copy the requirements file
COPY requirements.txt .
# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt
# Copy the rest of the application code
COPY . .

# Use a lightweight base image for the final image
FROM gcr.io/distroless/python3-debian10 AS runtime
# Set the working directory
WORKDIR /app

# Copy the application code
COPY --from=builder /app /app
# Copy the installed application from the builder stage
COPY --from=builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages

USER 1000:1000
# Set the entry point for the application
ENTRYPOINT ["python3"]
# Set the command to run the application
CMD ["main.py"]
