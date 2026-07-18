import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def get_social_links() -> dict[str, str]:
    path = ROOT / "lib" / "social-links.ts"
    if not path.exists():
        return {}
    content = path.read_text(encoding="utf-8")
    links = {}
    for match in re.finditer(r'(\w+):\s*["\']([^"\']+)["\']', content):
        links[match.group(1)] = match.group(2)
    return links

def get_site_config() -> dict[str, str]:
    path = ROOT / "lib" / "site-config.ts"
    if not path.exists():
        return {}
    content = path.read_text(encoding="utf-8")
    config = {}
    for match in re.finditer(r'(\w+):\s*["\']([^"\']+)["\']', content):
        config[match.group(1)] = match.group(2)
    return config

def get_orcid_id() -> str:
    try:
        import json
        with open(ROOT / "data" / "cv_data.json", encoding="utf-8") as f:
            data = json.load(f)
            return data["personalInfo"]["orcid"]
    except Exception:
        cfg = get_site_config()
        return cfg.get("orcidId", "0009-0004-9300-3936")

def get_scholar_id() -> str:
    links = get_social_links()
    url = links.get("scholar", "")
    match = re.search(r"[?&]user=([^&]+)", url)
    return match.group(1) if match else "CPmqNv4AAAAJ"

def get_github_username() -> str:
    try:
        import json
        with open(ROOT / "data" / "cv_data.json", encoding="utf-8") as f:
            data = json.load(f)
            return data["personalInfo"]["github"]
    except Exception:
        cfg = get_site_config()
        return cfg.get("repositoryOwner", "iabdul-aal")

def get_arxiv_url() -> str:
    links = get_social_links()
    return links.get("arxiv", "https://arxiv.org/a/abdulaal_i_1.html")

def get_email() -> str:
    try:
        import json
        with open(ROOT / "data" / "cv_data.json", encoding="utf-8") as f:
            data = json.load(f)
            return data["personalInfo"]["email"]
    except Exception:
        links = get_social_links()
        return links.get("email", "contact@iabdul-aal.me")

def get_projects() -> list[dict[str, str]]:
    path = ROOT / "lib" / "academic-content.ts"
    if not path.exists():
        return []
    content = path.read_text(encoding="utf-8")
    
    match = re.search(r"export const projects\s*=\s*\[(.*?)\]\s*as const", content, re.DOTALL)
    if not match:
        return []
    projects_block = match.group(1)
    
    project_objects = re.findall(r"\{\s*(.*?)\s*\}", projects_block, re.DOTALL)
    
    parsed_projects = []
    for obj in project_objects:
        id_match = re.search(r'id:\s*["\']([^"\']+)["\']', obj)
        if not id_match:
            continue
        pid = id_match.group(1)
        
        links_match = re.search(r'links:\s*\[(.*?)\]', obj, re.DOTALL)
        github_repo = ""
        zenodo_id = ""
        
        if links_match:
            links_block = links_match.group(1)
            link_objs = re.findall(r"\{\s*(.*?)\s*\}", links_block, re.DOTALL)
            for link in link_objs:
                label_match = re.search(r'label:\s*["\']([^"\']+)["\']', link)
                href_match = re.search(r'href:\s*["\']([^"\']+)["\']', link)
                if label_match and href_match:
                    href = href_match.group(1)
                    if "github.com/" in href:
                        m = re.search(r"github\.com/([^/]+/[^/]+)", href)
                        if m:
                            github_repo = m.group(1).strip("/")
                    elif "zenodo." in href:
                        m = re.search(r"zenodo\.(\d+)", href)
                        if m:
                            zenodo_id = m.group(1)
        
        parsed_projects.append({
            "id": pid,
            "github": github_repo,
            "zenodo_id": zenodo_id
        })
    return parsed_projects
