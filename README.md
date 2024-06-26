# Video Upload and Stream

This project allows you to upload video files and convert them into HLS format for streaming.

## Features

- Upload video files
- Convert videos to HLS format
- Stream videos using Video.js

## Setup

### Prerequisites

- Docker

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/VIGNESHSHYAM/Video-Upload-and-Stream.git
   cd HSL_ABS
   
2. installation package:
   ```sh
   npm install

3. Build the Docker image:
   ```sh
   docker build -t video-server .
   
4. Run the Docker container:
    ```sh
    docker run -p 8000:8000 -v "your_path_project_folder\HSL_ABS\uploads:/home/app/uploads" -v "/home/user/project/videos:/home/app/videos" video-server
