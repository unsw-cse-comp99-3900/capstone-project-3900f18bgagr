# Use the official Python image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Copy only requirements to leverage Docker cache
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r App/requirements.txt

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the application
CMD ["python", "App/endPoints.py"]
