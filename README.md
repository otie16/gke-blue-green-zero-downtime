Here’s a **README.md** you can drop directly into your repo that will make the project look professional, clear, and portfolio-ready — no diagrams, just solid explanation and instructions.

---

```markdown
# GKE Blue-Green Zero Downtime Deployment

Zero downtime Kubernetes deployments on **Google Kubernetes Engine (GKE)** using a **Blue-Green deployment strategy** and **GitHub Actions** CI/CD pipeline.  
This project demonstrates a **production-ready** workflow for deploying a containerized application to Kubernetes without impacting live users.

---

## 📌 Project Overview
- **Stack:** Kubernetes (GKE Autopilot), Docker, GitHub Actions, Google Artifact Registry
- **Deployment Strategy:** Blue-Green
- **Pipeline Features:**
  - Fully automated builds and deployments
  - Pushes Docker images to Google Artifact Registry
  - Deploys to GKE with Blue-Green switching
  - Supports instant rollback

---

## 🚀 Why Blue-Green?
Blue-Green deployment ensures **zero downtime** during updates:
- **Blue** = current live version
- **Green** = new version deployed in parallel
- Traffic is switched to the green version only after it passes checks
- Rollback is as simple as switching back to blue

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
├── k8s/                    # Kubernetes manifests
│   ├── blue-deployment.yaml
│   ├── green-deployment.yaml
│   └── service.yaml
└── .github/workflows/      # GitHub Actions pipeline
└── deploy.yml

````

---

## 🔑 Setup Instructions

### 1️⃣ Enable APIs in GCP
```bash
gcloud services enable \
  artifactregistry.googleapis.com \
  container.googleapis.com
````

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

### 4️⃣ Create Service Account for GitHub Actions

```bash
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions CI/CD"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/container.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.admin"
```

Create and download the JSON key:

```bash
gcloud iam service-accounts keys create key.json \
  --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com
```

---

### 5️⃣ Store Secrets in GitHub

Go to **GitHub → Settings → Secrets and variables → Actions** and add:

```
GCP_PROJECT       = your-project-id
GCP_SA_KEY        = contents of key.json
GKE_CLUSTER       = my-cluster
GKE_LOCATION      = us-central1
```

---

## 📦 Running the Pipeline

Push to the **main** branch:

```bash
git add .
git commit -m "Deploy new version"
git push origin main
```

The GitHub Actions workflow will:

1. Build the Docker image
2. Push it to Artifact Registry
3. Deploy the new (green) version to GKE
4. Switch traffic from blue to green

---

## 🔄 Rollback

To rollback to the previous version:

```bash
kubectl apply -f k8s/blue-deployment.yaml
```

---

## 🧑‍💻 Author

Built by **Otobong Godwin Edoho** — Demonstrating production-grade DevOps workflows.

---

```

---

If you want, I can now write you the **matching Kubernetes manifests (`blue-deployment.yaml`, `green-deployment.yaml`, `service.yaml`)** and the **GitHub Actions `deploy.yml`** so this README is actually runnable from scratch. That way, you’ll have a complete working project to push to GitHub.
```
