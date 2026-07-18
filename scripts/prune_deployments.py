import urllib.request
import urllib.parse
import json
import os
import sys
import time

OWNER = "iabdul-aal"
REPO = "iabdul-aal.github.io"
TOKEN = os.environ.get("GITHUB_TOKEN")
KEEP_COUNT = 5  # Number of recent deployments to keep

if not TOKEN:
    print("Error: GITHUB_TOKEN environment variable not set.")
    sys.exit(1)

def request_api(url, method="GET", data=None):
    headers = {
        "User-Agent": "deployment-pruner/1.0",
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {TOKEN}"
    }
    
    req_data = None
    if data is not None:
        req_data = json.dumps(data).encode("utf-8")
        headers["Content-Type"] = "application/json"
        
    req = urllib.request.Request(url, headers=headers, method=method, data=req_data)
    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            if method == "DELETE":
                return True
            return json.loads(res.read().decode("utf-8"))
    except Exception as e:
        print(f"Error {method} {url}: {e}")
        return None

def main():
    url = f"https://api.github.com/repos/{OWNER}/{REPO}/deployments?per_page=100"
    deployments = request_api(url)
    if not deployments:
        print("No deployments found.")
        return
    
    print(f"Found {len(deployments)} deployments.")
    if len(deployments) <= KEEP_COUNT:
        print(f"Deployments count ({len(deployments)}) is <= KEEP_COUNT ({KEEP_COUNT}). Nothing to prune.")
        return
    
    # Sort by created_at descending just in case the API returned them out of order (usually they are descending)
    deployments.sort(key=lambda d: d.get("created_at", ""), reverse=True)
    
    to_delete = deployments[KEEP_COUNT:]
    print(f"Pruning {len(to_delete)} older deployments (keeping the {KEEP_COUNT} most recent)...")
    
    for dep in to_delete:
        dep_id = dep["id"]
        # 1. Set status to inactive
        status_url = f"https://api.github.com/repos/{OWNER}/{REPO}/deployments/{dep_id}/statuses"
        request_api(status_url, method="POST", data={"state": "inactive"})
        
        # 2. Delete deployment
        dep_url = f"https://api.github.com/repos/{OWNER}/{REPO}/deployments/{dep_id}"
        if request_api(dep_url, method="DELETE"):
            print(f"  Successfully deleted old deployment {dep_id}.")
        else:
            print(f"  Failed to delete old deployment {dep_id}.")
        time.sleep(0.1)

if __name__ == "__main__":
    main()
