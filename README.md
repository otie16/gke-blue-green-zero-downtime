# GKE Blue-Green Zero Downtime Deployment

Zero downtime Kubernetes deployments on **Google Kubernetes Engine (GKE)** using a **Blue-Green deployment strategy** and **GitHub Actions** CI/CD pipeline.
This project demonstrates a **production-ready** workflow for deploying a containerized application to Kubernetes without impacting live users.

---

## 📌 Project Overview

* **Stack:** Kubernetes (GKE Autopilot), Docker, GitHub Actions, Google Artifact Registry
* **Deployment Strategy:** Blue-Green
* **Pipeline Features:**

  * Fully automated builds and deployments
  * Pushes Docker images to Google Artifact Registry
  * Deploys to GKE with Blue-Green switching
  * Supports instant rollback

---

## 🚀 Why Blue-Green?

Blue-Green deployment ensures **zero downtime** during updates:

* **Blue** = current live version
* **Green** = new version deployed in parallel
* Traffic is switched to the green version only after it passes checks
* Rollback is as simple as switching back to blue

---

## 🛠 Prerequisites

Before starting, ensure you have:

1. **Google Cloud Project** with billing enabled
2. **GKE Autopilot Cluster**
3. **Google Artifact Registry** created
4. **Google Cloud SDK** installed locally
5. **GitHub Repository** for the pipeline

---

## 📂 Project Structure

```
.
├── app/                   # Application source code
│   ├── Dockerfile          # Production-ready Dockerfile
│   ├── package.json
│   └── server.js
├── k8s/k8s-templates/                   # Kubernetes manifests
│   ├── deployment-blue.yaml
│   ├── deployment-green.yaml
│   └── service.yaml
└── .github/workflows/      # GitHub Actions pipeline
    └── deploy-bluegreen.yml
```

---

## 🔑 Setup Instructions

### 1️⃣ Enable APIs in GCP

```bash
gcloud services enable \
  artifactregistry.googleapis.com \
  container.googleapis.com
```

### 2️⃣ Create Artifact Registry

```bash
gcloud artifacts repositories create my-repo \
  --repository-format=docker \
  --location=us-central1 \
  --description="Docker repo for Blue-Green GKE deployments"
```

### 3️⃣ Create GKE Autopilot Cluster

```bash
gcloud container clusters create-auto my-cluster \
  --region us-central1
```

### 4️⃣ Enable Keyless Authentication from Github Actions to GCP

In our workflow, for authentication purposes github actions needs to authenticate with GCP before it can perform any actions in GCP.
This is why Keyless Auth has to be setup if not Github Actions won't have access to use GCP resources

I'll Write a Blog Post About this soon.

### 5️⃣ Store Secrets in GitHub

Go to **GitHub → Settings → Secrets and variables → Actions** and add:

```
GCP_PROJECT       = your-project-id
GKE_CLUSTER       = my-cluster
GKE_LOCATION      = us-central1
```

---

## 📦 Running the Pipeline

Push to the **master** branch:

```bash
git add .
git commit -m "Deploy new version"
git push origin master
```

The GitHub Actions workflow will:

1. Build the Docker image
2. Push it to Artifact Registry
3. Deploy the new (green) version to GKE
4. Switch traffic from blue to green



---

## 🧑‍💻 Author

Built by **Otobong Godwin Edoho** — Demonstrating production-grade DevOps workflows.
