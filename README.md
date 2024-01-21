# Cleanwalk V2 website and webapp

Cleanwalk.org is a website to find clean walks all over France.

## Table of Contents

- **[Frontend](front/README.md)**
- **[API](api/README.md)**

## Requirements

You only need Docker to launch the app.

### Linux

- [Docker Engine installation steps](https://docs.docker.com/engine/install/debian/#install-using-the-repository)
- [Docker Desktop (DEB package)](https://desktop.docker.com/linux/main/amd64/docker-desktop-4.26.1-amd64.deb?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-linux-amd64) (optional)

### macOS

- [Apple Silicon package](https://desktop.docker.com/mac/main/arm64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-mac-arm64)
- [Intel Chip package](https://desktop.docker.com/mac/main/amd64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-mac-amd64)

### Windows

- [Windows Installer](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)

## How to launch

### Developement

To launch the app on dev environnement, use the docker compose tool at the root directory of the project.

Dev script:

```bash
./scripts/compose-dev.sh
```

Direct command to not use the dev compose file:

```bash
docker compose up -d
```

To shutdown all stack or just a specific one:

```bash
docker compose down
```

### Production

Use Portainer for easier management. To install it, launch the script named "install-portainer.sh" and to access it you can check the service on port 9000.
