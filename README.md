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
